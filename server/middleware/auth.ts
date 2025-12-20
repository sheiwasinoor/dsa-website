import { getCookie, sendRedirect, createError } from "h3";

export default defineEventHandler((event) => {
  const url = event.node.req.url || "";
  const method = (event.node.req.method || "GET").toUpperCase();

  const publicRoutes = [
    "/admin/login",
    "/api/auth/login",
  ];

  if (publicRoutes.some((route) => url.startsWith(route))) {
    return;
  }

  // Public read-only API endpoints (used by the public site)
  const publicReadApiRoutes = [
    "/api/projects/get",
    "/api/projects/list",
    "/api/news/get",
    "/api/news/list",
  ];

  if (method === "GET" && publicReadApiRoutes.some((route) => url.startsWith(route))) {
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
