import { PrismaClient } from "@prisma/client";
import { createError, getQuery } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { destination } = getQuery(event);
    const where =
      typeof destination === "string" && destination.length
        ? { destination }
        : undefined;

    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: "desc" },
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
