// server/api/news/delete.post.ts
import { PrismaClient } from "@prisma/client";
import { readBody, createError } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id } = body || {};

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Field 'id' is required for delete",
    });
  }

  // Optionally: check it exists first (not strictly needed)
  try {
    await prisma.newsPost.delete({
      where: { id },
    });
  } catch (err) {
    throw createError({
      statusCode: 404,
      statusMessage: "News post not found",
    });
  }

  return { success: true };
});