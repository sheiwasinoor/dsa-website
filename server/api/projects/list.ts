import { PrismaClient } from "@prisma/client";
import { createError } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  try {
    const projects = await prisma.project.findMany({
      where: { destination: "landscape" },
      include: {
        images: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Format output for frontend
    const formatted = projects.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: { en: p.titleEn, zh: p.titleZh },
      category: { en: p.categoryEn, zh: p.categoryZh },
      keywords: p.keywords ? p.keywords.split(",").map((s) => s.trim()) : [],
      thumbnail:
        p.coverImageUrl || // NEW — use coverImageUrl
        p.images.find((img) => img.isCover)?.url ||
        p.images[0]?.url ||
        "/images/placeholders/project.png",
    }));

    return formatted;
  } catch (err) {
    console.error("Landscape list error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to load landscape projects",
    });
  }
});