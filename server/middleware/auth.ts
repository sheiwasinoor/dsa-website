import { getCookie, sendRedirect, createError } from "h3";

export default defineEventHandler((event) => {
  const url = event.node.req.url || "";

  const publicRoutes = [
    "/admin/login",
    "/api/auth/login",
  ];

  if (publicRoutes.some((route) => url.startsWith(route))) {
    return;
  }

  const protectedRoutes = [
    "/admin",
    "/api/projects",
    "/api/news",        // ⭐ protect news APIs
  ];

  const needsAuth = protectedRoutes.some((route) =>
    url.startsWith(route)
  );

  if (!needsAuth) return;

  const token = getCookie(event, "auth_token");

  if (!token) {
    if (url.startsWith("/api")) {
      throw createError({
        statusCode: 401,
        statusMessage: "Not authenticated",
      });
    }

    return sendRedirect(event, "/admin/login");
  }
});