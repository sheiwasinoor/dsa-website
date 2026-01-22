import prisma from "~/server/utils/prisma";
import { readBody, createError } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { orderedIds } = body || {};

  if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "orderedIds must be a non-empty array",
    });
  }

  try {
    const baseTime = Date.now();
    for (let i = 0; i < orderedIds.length; i++) {
      const id = orderedIds[i];
      await prisma.newsPost.updateMany({
        where: { id },
        data: { createdAt: new Date(baseTime - i * 1000) },
      });
    }

    return { success: true };
  } catch (err) {
    console.error("News reorder error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to reorder news posts",
    });
  }
});
