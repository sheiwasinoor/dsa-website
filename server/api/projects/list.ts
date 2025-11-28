import { PrismaClient } from "@prisma/client";
import { createError } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { destination } = getQuery(event);
    const dest = typeof destination === "string" ? destination : "landscape";

    const projects = await prisma.project.findMany({
      where: { destination: dest },
      include: {
        images: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = projects.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: { en: p.titleEn, zh: p.titleZh },
      category: { en: p.categoryEn, zh: p.categoryZh },
      keywords: p.keywords ? p.keywords.split(",").map((s) => s.trim()) : [],
      thumbnail:
        p.coverImageUrl ||
        p.images.find((img) => img.isCover)?.url ||
        p.images[0]?.url ||
        "/images/placeholders/project.png",
    }));

    return formatted;
  } catch (err) {
    console.error("Project list error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to load projects",
    });
  }
});