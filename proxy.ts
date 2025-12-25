import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserFromSessionAction } from "./modules/auth/auth.actions";
import { AUTH_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES, STATUS_ROUTES } from "./routes/constants";
import { TAuthRoutes, TProtectedRoutes, TPublicRoutes, TStatusRoutes } from "./routes/types";
import { ROUTE_ROLES_MAP } from "./routes/rbac";
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Strip locale prefix for route matching
  const pathnameWithoutLocale = pathname.replace(/^\/(en|ar)/, '') || '/';

  // Extract locale for redirects
  const locale = pathname.match(/^\/(en|ar)/)?.[1] || 'en';

  // Check public and status routes first
  if (
    STATUS_ROUTES.includes(pathnameWithoutLocale as TStatusRoutes) ||
    PUBLIC_ROUTES.includes(pathnameWithoutLocale as TPublicRoutes)
  ) {
    return intlMiddleware(request);
  }

  const user = await getUserFromSessionAction();

  if (AUTH_ROUTES.includes(pathnameWithoutLocale as TAuthRoutes)) {
    if (user.success) {
      return NextResponse.redirect(new URL(`/${locale}/already-logged`, request.url));
    }
    return intlMiddleware(request);
  }

  if (PROTECTED_ROUTES.includes(pathnameWithoutLocale as TProtectedRoutes)) {
    if (user.success) {
      const userRole = user.data.role;
      const allowedFor = ROUTE_ROLES_MAP.get(pathnameWithoutLocale as TProtectedRoutes)!;
      if (allowedFor.includes(userRole)) {
        return intlMiddleware(request);
      }
      return NextResponse.redirect(new URL(`/${locale}/forbidden`, request.url));
    } else {
      return NextResponse.redirect(new URL(`/${locale}/unauthorized`, request.url));
    }
  }

  return intlMiddleware(request);
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
    '/(en|ar)/:path*',
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
  ],
};
