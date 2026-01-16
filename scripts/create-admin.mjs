import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const email = "admin";
const password = "admin2030!";

const hashed = await bcrypt.hash(password, 10);

await prisma.user.upsert({
  where: { email },
  update: { password: hashed, role: "admin" },
  create: { email, password: hashed, role: "admin" },
});

console.log("Admin user upserted:", email);

await prisma.$disconnect();
