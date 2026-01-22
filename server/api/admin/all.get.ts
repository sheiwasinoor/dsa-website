import prisma from "~/server/utils/prisma";
import { createError } from "h3";

export default defineEventHandler(async () => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        slug: true,
        titleEn: true,
        titleZh: true,
        destination: true,
        createdAt: true,
      },
    });

    return projects;
  } catch (err) {
    console.error("Admin project list error:", err);

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to load projects",
    });
  }
});
