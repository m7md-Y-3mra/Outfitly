import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserFromSessionAction } from "./modules/auth/auth.actions";
import { AUTH_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES, STATUS_ROUTES } from "./routes/constants";
import { TAuthRoutes, TProtectedRoutes, TPublicRoutes, TStatusRoutes } from "./routes/types";
import { ROUTE_ROLES_MAP } from "./routes/rbac";

export default async function proxy(request: NextRequest) {
  const user = await getUserFromSessionAction();
  const path = request.nextUrl.pathname;

  if (
    STATUS_ROUTES.includes(path as TStatusRoutes) ||
    PUBLIC_ROUTES.includes(path as TPublicRoutes)
  ) {
    return NextResponse.next();
  }

  if (AUTH_ROUTES.includes(path as TAuthRoutes)) {
    if (user.success) {
      return NextResponse.redirect(new URL("/already-logged", request.url));
    }
    return NextResponse.next();
  }

  if (PROTECTED_ROUTES.includes(path as TProtectedRoutes)) {
    if (user.success) {
      const userRole = user.data.role;
      const allowedFor = ROUTE_ROLES_MAP.get(path as TProtectedRoutes)!;
      if (allowedFor.includes(userRole)) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/forbidden", request.url));
    } else {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/forbidden",
    "/already-logged",
    "/unauthorized",
    "/sign-in",
    "/sign-up",
    "/profile",
    "/ai-generator",
    "/weather",
    "/explore",
    "/my-wardrobe",
    "/dashboard",
  ],
};
