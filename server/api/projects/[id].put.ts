import prisma from "~/server/utils/prisma";
import {
  readMultipartFormData,
  createError,
  getRouterParam,
} from "h3";
import { join } from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing project id",
    });
  }

  const form = await readMultipartFormData(event);

  if (!form) {
    throw createError({
      statusCode: 400,
      statusMessage: "No form data received",
    });
  }

  // Separate fields & files (keep order for new uploads)
  const fields: Record<string, string> = {};
  const files: any[] = [];

  for (const entry of form) {
    if (entry.type) {
      files.push(entry);
    } else {
      fields[entry.name] = entry.data.toString("utf8");
    }
  }

  // Validate required fields
  const required = [
    "slug",
    "titleEn",
    "titleZh",
    "categoryEn",
    "categoryZh",
  ];

  for (const r of required) {
    if (!fields[r]) {
      throw createError({
        statusCode: 400,
        statusMessage: `Missing required field: ${r}`,
      });
    }
  }

  let destination = fields.destination || fields.theme;

  if (!destination) {
    const existing = await prisma.project.findUnique({
      where: { id },
      select: { destination: true },
    });
    destination = existing?.destination;
  }

  if (!destination || !["landscape", "lighting", "youngArt"].includes(destination)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid destination",
    });
  }

  // heroImageIds can be used to mark cover images (maps to isCover)
  let heroImageIds: string[] = [];
  const hasHeroField = Object.prototype.hasOwnProperty.call(
    fields,
    "heroImageIds"
  );
  if (fields.heroImageIds) {
    try {
      const parsed = JSON.parse(fields.heroImageIds);
      if (Array.isArray(parsed)) {
        heroImageIds = parsed.filter((v) => typeof v === "string");
      }
    } catch {
      // ignore parse errors
    }
  }
  const coverExistingId = (fields.coverExistingId || "").trim();
  const deletedImageIds: string[] = (() => {
    if (!fields.deletedImageIds) return [];
    try {
      const parsed = JSON.parse(fields.deletedImageIds);
      return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
    } catch {
      return [];
    }
  })();
  const existingOrder: string[] = (() => {
    if (!fields.existingOrder) return [];
    try {
      const parsed = JSON.parse(fields.existingOrder);
      return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
    } catch {
      return [];
    }
  })();

  // Upload directory
  const uploadDir = join(process.cwd(), "public", "uploads", "projects");
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }

  // Helpers
  const newImages = files.filter((f) => f.type?.startsWith("image/"));
  const coverIndex = Number(fields.coverIndex ?? -1);
  const coverIndexValid =
    Number.isInteger(coverIndex) && coverIndex >= 0 && coverIndex < newImages.length;

  const getIsHero = (index: number) => {
    const key = `isHero_${index}`;
    if (Object.prototype.hasOwnProperty.call(fields, key)) {
      return (
        fields[key] === "true" ||
        fields[key] === "1" ||
        fields[key] === "on"
      );
    }
    return false;
  };

  try {
    // Ensure project exists (for fallbacks)
    const existingProject = await prisma.project.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!existingProject) {
      throw createError({
        statusCode: 404,
        statusMessage: "Project not found",
      });
    }

    // Helpers to keep existing meta when UI does not send a field
    const keepOrNull = (val: string | undefined, existing: string | null) =>
      val !== undefined ? (val === "" ? null : val) : existing;

    // Update base fields (preserve existing values if a field is missing)
    const updated = await prisma.project.update({
      where: { id },
      data: {
        slug: fields.slug,
        titleEn: fields.titleEn,
        titleZh: fields.titleZh,
        categoryEn: fields.categoryEn,
        categoryZh: fields.categoryZh,

        descriptionEn: keepOrNull(fields.descriptionEn, existingProject.descriptionEn),
        descriptionZh: keepOrNull(fields.descriptionZh, existingProject.descriptionZh),

        location: keepOrNull(fields.location, existingProject.location),
        locationZh: keepOrNull(fields.locationZh, existingProject.locationZh),

        client: keepOrNull(fields.client, existingProject.client),
        clientZh: keepOrNull(fields.clientZh, existingProject.clientZh),

        status: keepOrNull(fields.status, existingProject.status),
        statusZh: keepOrNull(fields.statusZh, existingProject.statusZh),

        service: keepOrNull(fields.service, existingProject.service),
        serviceZh: keepOrNull(fields.serviceZh, existingProject.serviceZh),

        keywords: keepOrNull(fields.keywords, existingProject.keywords),

        destination,
      },
    });

    // Delete removed images
    if (deletedImageIds.length) {
      await prisma.projectImage.deleteMany({
        where: { projectId: id, id: { in: deletedImageIds } },
      });
    }

    // Create new images
    const createdImages: { id: string; url: string }[] = [];
    for (let i = 0; i < newImages.length; i++) {
      const img = newImages[i];
      const buffer = img.data as Buffer;
      const filename = `${Date.now()}-${img.filename}`;
      const filePath = join(uploadDir, filename);
      writeFileSync(filePath, buffer);

      const created = await prisma.projectImage.create({
        data: {
          projectId: id,
          url: `/uploads/projects/${filename}`,
          altEn: fields.altEn || null,
          altZh: fields.altZh || null,
          isHero: getIsHero(i),
          isCover: false,
        },
      });
      createdImages.push({ id: created.id, url: created.url });
    }

    const newHeroIds = createdImages
      .map((img, i) => (getIsHero(i) ? img.id : null))
      .filter((v): v is string => Boolean(v));

    // Update hero flags if provided or new hero images exist
    if (hasHeroField || newHeroIds.length) {
      const finalHeroIds = [...heroImageIds, ...newHeroIds];
      await prisma.projectImage.updateMany({
        where: { projectId: id },
        data: { isHero: false },
      });
      if (finalHeroIds.length) {
        await prisma.projectImage.updateMany({
          where: { projectId: id, id: { in: finalHeroIds } },
          data: { isHero: true },
        });
      }
    }

    // Cover selection: explicit coverExistingId > new coverIndex > hero > existing cover > first image
    const coverFromNew = coverIndexValid ? createdImages[coverIndex]?.id : "";
    const currentImages = await prisma.projectImage.findMany({
      where: { projectId: id },
      orderBy: { id: "asc" },
      select: { id: true, url: true, isCover: true, isHero: true, altEn: true, altZh: true },
    });
    const presentIds = new Map(currentImages.map((img) => [img.id, img.url]));
    const candidateIds = [
      coverExistingId,
      coverFromNew,
      hasHeroField && heroImageIds.length ? heroImageIds[0] : "",
      newHeroIds[0] || "",
      currentImages.find((img) => img.isCover)?.id || "",
      currentImages[0]?.id || "",
    ];
    const coverTargetId = candidateIds.find(
      (cid) => cid && presentIds.has(cid)
    );

    if (hasHeroField || coverTargetId) {
      await prisma.projectImage.updateMany({
        where: { projectId: id },
        data: { isCover: false },
      });

      if (coverTargetId) {
        await prisma.projectImage.updateMany({
          where: { projectId: id, id: coverTargetId },
          data: { isCover: true },
        });

        const coverUrl = presentIds.get(coverTargetId) || null;

        if (coverUrl) {
          await prisma.project.update({
            where: { id },
            data: { coverImageUrl: coverUrl },
          });
        }
      }
    }

    // Reorder existing images if a new order was provided
    if (existingOrder.length) {
      const idToData = new Map(currentImages.map((img) => [img.id, img]));
      const orderedIds = [
        ...existingOrder.filter((id) => idToData.has(id)),
        ...currentImages.filter((img) => !existingOrder.includes(img.id)).map((img) => img.id),
      ];
      const needsReorder = orderedIds.some((id, idx) => id !== currentImages[idx]?.id);

      if (needsReorder) {
        const orderedData = orderedIds
          .map((id) => idToData.get(id))
          .filter((v): v is typeof currentImages[number] => Boolean(v));

        await prisma.$transaction(async (tx) => {
          await tx.projectImage.deleteMany({ where: { projectId: id } });

          for (const img of orderedData) {
            const recreated = await tx.projectImage.create({
              data: {
                projectId: id,
                url: img.url,
                altEn: img.altEn,
                altZh: img.altZh,
                isCover: img.isCover,
                isHero: img.isHero,
              },
            });

            if (img.isCover && img.url) {
              await tx.project.update({
                where: { id },
                data: { coverImageUrl: img.url },
              });
            }
          }
        });
      }
    }

    return {
      success: true,
      project: updated,
    };
  } catch (err) {
    console.error("Project update error:", err);

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update project",
    });
  }
});
