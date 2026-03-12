import prisma from "~/server/utils/prisma";
import { readBody, createError, setCookie } from "h3";
import { verifyPassword } from "~/server/utils/hash";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, email, password } = body;
  const loginId = String(username || email || "").trim();

  console.log("🔵 LOGIN HIT:", loginId);

  if (!loginId || !password) {
    console.log("⛔ Missing username/password");
    throw createError({
      statusCode: 400,
      statusMessage: "Username and password are required",
    });
  }

  const user = await prisma.user.findUnique({
    where: { email: loginId },
  });

  console.log("🟡 USER FOUND:", user);

  if (!user) {
    console.log("⛔ No user found for:", loginId);
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  }

  const isValid = await verifyPassword(password, user.password);

  console.log("🔴 VALID PASSWORD?:", isValid);

  if (!isValid) {
    console.log("⛔ Incorrect password for:", loginId);
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

  console.log("🟢 LOGIN SUCCESS for:", loginId);

  return { success: true };
});
