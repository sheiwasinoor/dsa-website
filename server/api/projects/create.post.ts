// server/api/projects/create.post.ts
import { PrismaClient } from '@prisma/client';
import { readMultipartFormData, createError } from 'h3';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event);

  if (!form) {
    throw createError({
      statusCode: 400,
      statusMessage: "No form data received",
    });
  }

  // Separate text fields & files
  const fields: Record<string, string> = {};
  const files: any[] = [];

  for (const entry of form) {
    if (entry.type) {
      files.push(entry);
    } else {
      fields[entry.name] = entry.data.toString("utf8");
    }
  }

  // Validate required fields
  const required = [
    "slug",
    "titleEn",
    "titleZh",
    "categoryEn",
    "categoryZh"
  ];

  for (const r of required) {
    if (!fields[r]) {
      throw createError({
        statusCode: 400,
        statusMessage: `Missing required field: ${r}`,
      });
    }
  }

  // Validate theme/destination
  if (!fields.theme || !["landscape", "lighting", "youngArt"].includes(fields.theme)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid or missing theme (landscape / lighting / youngArt)",
    });
  }

  // Create project entry
  const project = await prisma.project.create({
    data: {
      slug: fields.slug,
      titleEn: fields.titleEn,
      titleZh: fields.titleZh,
      categoryEn: fields.categoryEn,
      categoryZh: fields.categoryZh,
      descriptionEn: fields.descriptionEn || null,
      descriptionZh: fields.descriptionZh || null,
      location: fields.location || null,
      client: fields.client || null,
      status: fields.status || null,
      service: fields.service || null,
      keywords: fields.keywords || null,
      theme: fields.theme || "landscape",
    },
  });

  // File upload directory
  const uploadDir = join(process.cwd(), 'public', 'uploads', 'projects');

  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }

  // Filter image files
  const images = files.filter(f => f.type?.startsWith("image/"));

  for (const img of images) {
    const buffer = img.data as Buffer;

    // Generate filename
    const filename = `${Date.now()}-${img.filename}`;
    const filePath = join(uploadDir, filename);

    // Write file to disk
    writeFileSync(filePath, buffer);

    // Save DB record
    await prisma.projectImage.create({
      data: {
        projectId: project.id,
        url: `/uploads/projects/${filename}`,
        altEn: fields.altEn || null,
        altZh: fields.altZh || null,
        isCover: false,
      },
    });
  }

  return {
    success: true,
    projectId: project.id,
    message: "Project created successfully!",
  };
});