import prisma from "~/server/utils/prisma";

export default defineEventHandler(async () => {
  return prisma.newsPost.findMany({
    select: {
      id: true,
      slug: true,
      titleEn: true,
      titleZh: true,
      bodyEn: true,
      bodyZh: true,
      imageUrl: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
});
