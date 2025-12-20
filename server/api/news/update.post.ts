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

  const fields: Record<string, string> = {};
  let file: any = null;

  for (const item of form) {
    if (item.filename) {
      file = item;
    } else {
      fields[item.name] = item.data.toString("utf8");
    }
  }

  const id = fields.id;
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
    titleEn: fields.titleEn !== undefined ? fields.titleEn : existing.titleEn,
    titleZh: fields.titleZh !== undefined ? fields.titleZh : existing.titleZh,
    bodyEn: fields.bodyEn !== undefined ? fields.bodyEn : existing.bodyEn,
    bodyZh: fields.bodyZh !== undefined ? fields.bodyZh : existing.bodyZh,
    slug: fields.slug || existing.slug,
    published: fields.published !== undefined ? fields.published === "true" : existing.published,
  };

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
