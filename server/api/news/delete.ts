import { PrismaClient } from "@prisma/client";
import { createError, getQuery } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing id",
    });
  }

  try {
    await prisma.newsPost.delete({
      where: { id: String(id) },
    });
  } catch (e) {
    throw createError({
      statusCode: 404,
      statusMessage: "News post not found",
    });
  }

  return { success: true };
});