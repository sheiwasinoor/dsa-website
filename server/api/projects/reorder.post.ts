import { PrismaClient } from "@prisma/client";
import { readBody, createError } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { destination, orderedIds } = body || {};

  if (!destination || !["landscape", "lighting", "youngArt"].includes(destination)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid destination",
    });
  }

  if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "orderedIds must be a non-empty array",
    });
  }

  try {
    // Apply ordering by setting descending createdAt values so public lists honor the order.
    const baseTime = Date.now();
    for (let i = 0; i < orderedIds.length; i++) {
      const id = orderedIds[i];
      await prisma.project.updateMany({
        where: { id },
        data: {
          createdAt: new Date(baseTime - i * 1000), // 1s spacing to preserve order
        },
      });
    }

    return { success: true };
  } catch (err) {
    console.error("Project reorder error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to reorder projects",
    });
  }
});
