import { PrismaClient } from "@prisma/client";
import { readMultipartFormData, createError } from "h3";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event);

  if (!form) {
    throw createError({
      statusCode: 400,
      statusMessage: "No form data received",
    });
  }

  // Text fields
  const fields: Record<string, string> = {};
  let imageFile: any = null;

  for (const f of form) {
    if (f.type?.startsWith("image/")) {
      imageFile = f;
    } else {
      fields[f.name] = f.data.toString("utf8");
    }
  }

  // Validate required fields
  const required = ["slug", "titleEn", "titleZh", "bodyEn", "bodyZh"];
  for (const r of required) {
    if (!fields[r]) {
      throw createError({
        statusCode: 400,
        statusMessage: `Missing required field: ${r}`,
      });
    }
  }

  // Upload image if included
  let imageUrl: string | null = null;

  if (imageFile) {
    const uploadDir = join(process.cwd(), "public", "uploads", "news");

    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    const filename = `${Date.now()}-${imageFile.filename}`;
    const filepath = join(uploadDir, filename);

    writeFileSync(filepath, imageFile.data);

    imageUrl = `/uploads/news/${filename}`;
  }

  // Save in database
  const post = await prisma.newsPost.create({
    data: {
      slug: fields.slug,
      titleEn: fields.titleEn,
      titleZh: fields.titleZh,
      bodyEn: fields.bodyEn,
      bodyZh: fields.bodyZh,
      imageUrl,
      published: fields.published === "true",
    },
  });

  return { success: true, id: post.id };
});