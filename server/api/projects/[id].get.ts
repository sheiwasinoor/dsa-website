import { PrismaClient } from "@prisma/client";
import { createError } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  if (!id || typeof id !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing or invalid project ID",
    });
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { id: "asc" },
        },
      },
    });

    if (!project) {
      throw createError({
        statusCode: 404,
        statusMessage: "Project not found",
      });
    }

    return {
      id: project.id,
      slug: project.slug,

      // Titles
      titleEn: project.titleEn,
      titleZh: project.titleZh,

      // Categories
      categoryEn: project.categoryEn,
      categoryZh: project.categoryZh,

      // Descriptions
      descriptionEn: project.descriptionEn,
      descriptionZh: project.descriptionZh,

      // Meta (bilingual)
      location: project.location,
      locationZh: project.locationZh,

      client: project.client,
      clientZh: project.clientZh,

      status: project.status,
      statusZh: project.statusZh,

      service: project.service,
      serviceZh: project.serviceZh,

      // System
      keywords: project.keywords,
      destination: project.destination,
      coverImageUrl: project.coverImageUrl,

      // Images
      images: project.images.map((img) => ({
        id: img.id,
        url: img.url,
        altEn: img.altEn,
        altZh: img.altZh,
        isCover: img.isCover,
        isHero: img.isHero,
      })),

      createdAt: project.createdAt,
    };
  } catch (err) {
    console.error("Admin project get error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to load project",
    });
  }
});
