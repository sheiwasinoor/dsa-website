// server/api/news/update.post.ts
import { PrismaClient } from "@prisma/client";
import { createError, readMultipartFormData } from "h3";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event);

  if (!form) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid form data",
    });
  }

  const map = Object.fromEntries(
    form
      .filter((item) => item.type === "field")
      .map((item) => [item.name, item.value])
  );

  const id = map.id;
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing news ID",
    });
  }

  const existing = await prisma.newsPost.findUnique({
    where: { id },
  });

  if (!existing) {
    throw createError({
      statusCode: 404,
      statusMessage: "News post not found",
    });
  }

  // Prepare update payload
  const updateData: any = {
    titleEn: map.titleEn,
    titleZh: map.titleZh,
    bodyEn: map.bodyEn,
    bodyZh: map.bodyZh,
    slug: map.slug,
    published: map.published === "true",
  };

  // Check for uploaded file
  const file = form.find((item) => item.type === "file");

  if (file && file.filename) {
    const uploadDir = path.join(process.cwd(), "public/uploads/news");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename = `${Date.now()}-${file.filename}`;
    const fullPath = path.join(uploadDir, filename);

    fs.writeFileSync(fullPath, file.data);

    // Save new URL
    updateData.imageUrl = `/uploads/news/${filename}`;
  }

  // Save changes
  const updated = await prisma.newsPost.update({
    where: { id },
    data: updateData,
  });

  return { success: true, post: updated };
});