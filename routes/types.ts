import { AUTH_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES, STATUS_ROUTES } from "./constants";
import { ROUTE_ROLES_MAP } from "./rbac";

export type TProtectedRoutes = (typeof PROTECTED_ROUTES)[number];

export type TAuthRoutes = (typeof AUTH_ROUTES)[number];
export type TPublicRoutes = (typeof PUBLIC_ROUTES)[number];
export type TStatusRoutes = (typeof STATUS_ROUTES)[number];

export type TPageRoutes = TProtectedRoutes | TAuthRoutes | TPublicRoutes;
export const protectedRoutes = Array.from(ROUTE_ROLES_MAP.keys());
