import { PrismaClient } from "@prisma/client";
import { readBody, createError } from "h3";
import { unlink } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { projectId } = body;

  if (!projectId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing projectId",
    });
  }

  try {
    // 1️⃣ Fetch project + images
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { images: true },
    });

    if (!project) {
      throw createError({
        statusCode: 404,
        statusMessage: "Project not found",
      });
    }

    // 2️⃣ Delete image files from disk
    for (const img of project.images) {
      if (!img.url) continue;

      const filePath = join(
        process.cwd(),
        "public",
        img.url.replace(/^\/+/, "")
      );

      if (existsSync(filePath)) {
        await unlink(filePath).catch(() => {
          console.warn("Failed to delete image:", filePath);
        });
      }
    }

    // 3️⃣ Delete image records
    await prisma.projectImage.deleteMany({
      where: { projectId },
    });

    // 4️⃣ Delete project
    await prisma.project.delete({
      where: { id: projectId },
    });

    return {
      success: true,
      message: "Project deleted successfully",
    };
  } catch (err) {
    console.error("Delete project error:", err);

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete project",
    });
  }
});