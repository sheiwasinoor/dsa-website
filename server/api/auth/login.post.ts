import { PrismaClient } from "@prisma/client";
import { readBody, createError, setCookie } from "h3";
import { verifyPassword } from "~/server/utils/hash";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { email, password } = body;

  console.log("🔵 LOGIN HIT:", email, password);

  if (!email || !password) {
    console.log("⛔ Missing email/password");
    throw createError({
      statusCode: 400,
      statusMessage: "Email and password are required",
    });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  console.log("🟡 USER FOUND:", user);

  if (!user) {
    console.log("⛔ No user found for:", email);
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  }

  const isValid = await verifyPassword(password, user.password);

  console.log("🔴 VALID PASSWORD?:", isValid);

  if (!isValid) {
    console.log("⛔ Incorrect password for:", email);
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  }

  // Set secure cookie
  setCookie(event, "auth_token", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  // Allow browser to read the Set-Cookie header
  appendHeader(event, "Access-Control-Expose-Headers", "set-cookie");

  console.log("🟢 LOGIN SUCCESS for:", email);

  return { success: true };
});