// server/api/news/get.ts
import { PrismaClient } from "@prisma/client";
import { getQuery, createError } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = query.id as string | undefined;
  const slug = query.slug as string | undefined;

  if (!id && !slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Either 'id' or 'slug' is required",
    });
  }

  const where = id ? { id } : { slug: slug! };

  const post = await prisma.newsPost.findUnique({ where });

  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: "News post not found",
    });
  }

  return post;
});