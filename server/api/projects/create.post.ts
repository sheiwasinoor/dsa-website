// server/api/projects/create.post.ts
import prisma from "~/server/utils/prisma";
import { readMultipartFormData, createError } from 'h3';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event);

  if (!form) {
    throw createError({
      statusCode: 400,
      statusMessage: "No form data received",
    });
  }

  // Separate text fields & files
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
    "categoryZh"
  ];

  for (const r of required) {
    if (!fields[r]) {
      throw createError({
        statusCode: 400,
        statusMessage: `Missing required field: ${r}`,
      });
    }
  }

  // Normalize destination (accept legacy "theme" from UI)
  const destination = fields.destination || fields.theme;

  if (!destination || !["landscape", "lighting", "youngArt"].includes(destination)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid or missing destination (landscape / lighting / youngArt)",
    });
  }

  // Create project entry
  const project = await prisma.project.create({
    data: {
      slug: fields.slug,
      titleEn: fields.titleEn,
      titleZh: fields.titleZh,
      categoryEn: fields.categoryEn,
      categoryZh: fields.categoryZh,
      descriptionEn: fields.descriptionEn || null,
      descriptionZh: fields.descriptionZh || null,
      location: fields.location || null,
      locationZh: fields.locationZh || null,
      client: fields.client || null,
      clientZh: fields.clientZh || null,
      status: fields.status || null,
      statusZh: fields.statusZh || null,
      service: fields.service || null,
      serviceZh: fields.serviceZh || null,
      keywords: fields.keywords || null,
      destination,
    },
  });

  // File upload directory
  const uploadDir = join(process.cwd(), 'public', 'uploads', 'projects');

  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }

  // Filter image files
  const images = files.filter(f => f.type?.startsWith("image/"));

  function getIsHero(index: number) {
    const key = `isHero_${index}`;
    if (Object.prototype.hasOwnProperty.call(fields, key)) {
      return fields[key] === "true" || fields[key] === "1" || fields[key] === "on";
    }
    // default to true to keep existing behavior when no flag is sent
    return true;
  }

  const coverIndex = Number(fields.coverIndex ?? 0);
  const coverIndexValid = Number.isInteger(coverIndex) && coverIndex >= 0;

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const buffer = img.data as Buffer;

    // Generate filename
    const filename = `${Date.now()}-${img.filename}`;
    const filePath = join(uploadDir, filename);

    // Write file to disk
    writeFileSync(filePath, buffer);

    // Save DB record
    const createdImage = await prisma.projectImage.create({
      data: {
        projectId: project.id,
        url: `/uploads/projects/${filename}`,
        altEn: fields.altEn || null,
        altZh: fields.altZh || null,
        isHero: getIsHero(i),
        isCover: coverIndexValid ? i === coverIndex : getIsHero(i) ?? false,
      },
    });

    if ((coverIndexValid && i === coverIndex) || (!coverIndexValid && getIsHero(i))) {
      await prisma.project.update({
        where: { id: project.id },
        data: { coverImageUrl: createdImage.url },
      });
    }
  }

  return {
    success: true,
    projectId: project.id,
    message: "Project created successfully!",
  };
});
