

import { PrismaClient } from "@prisma/client";
import { createError, getQuery } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { slug } = getQuery(event);

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing slug",
    });
  }

  try {
    const project = await prisma.project.findUnique({
      where: { slug: String(slug) },
      include: {
        images: true,
      },
    });

    if (!project) {
      throw createError({
        statusCode: 404,
        statusMessage: "Project not found",
      });
    }

    // Format output for frontend — unified & clean
    return {
      id: project.id,
      slug: project.slug,
      title: { en: project.titleEn, zh: project.titleZh },
      category: { en: project.categoryEn, zh: project.categoryZh },
      description: { en: project.descriptionEn, zh: project.descriptionZh },
      location: project.location,
      client: project.client,
      status: project.status,
      service: project.service,
      destination: project.destination,
      keywords: project.keywords
        ? project.keywords.split(",").map((s) => s.trim())
        : [],
      coverImageUrl: project.coverImageUrl,
      images: project.images.map((img) => ({
        id: img.id,
        url: img.url,
        alt: {
          en: img.altEn,
          zh: img.altZh,
        },
        isCover: img.isCover,
      })),
    };
  } catch (err) {
    console.error("Project get error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to load project",
    });
  }
});