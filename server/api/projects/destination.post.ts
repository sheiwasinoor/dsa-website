import { PrismaClient } from "@prisma/client";
import { readBody, createError } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id, destination } = body || {};

  if (!id || typeof id !== "string") {
    throw createError({ statusCode: 400, statusMessage: "Missing project id" });
  }

  if (!["landscape", "lighting", "youngArt"].includes(destination)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid destination",
    });
  }

  try {
    const updated = await prisma.project.update({
      where: { id },
      data: { destination },
      select: { id: true, destination: true },
    });

    return { success: true, project: updated };
  } catch (err) {
    console.error("Destination update error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update destination",
    });
  }
});
