// server/api/projects/image/delete.post.ts
import prisma from "~/server/utils/prisma";
import { readBody, createError } from "h3";
import { unlinkSync, existsSync } from "fs";
import { join } from "path";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body?.imageId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing imageId",
    });
  }

  // Find image
  const image = await prisma.projectImage.findUnique({
    where: { id: Number(body.imageId) },
  });

  if (!image) {
    throw createError({
      statusCode: 404,
      statusMessage: "Image not found",
    });
  }

  // Resolve absolute file path
  const filePath = join(process.cwd(), "public", image.url);

  // Delete file if it exists
  if (existsSync(filePath)) {
    try {
      unlinkSync(filePath);
    } catch (err) {
      console.warn("File deletion failed:", filePath);
    }
  }

  // Delete DB record
  await prisma.projectImage.delete({
    where: { id: image.id },
  });

  return {
    success: true,
    message: "Image deleted successfully",
  };
});