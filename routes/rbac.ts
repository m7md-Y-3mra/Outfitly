import { UserRole } from "@/app/generated/prisma/enums";
import { TProtectedRoutes } from "./types";

export const ROUTE_ROLES_MAP = new Map<TProtectedRoutes, readonly UserRole[]>([
  ["/ai-generator", ["USER", "ADMIN"]],
  ["/profile", ["USER", "ADMIN"]],
  ["/explore", ["USER", "ADMIN"]],
  ["/weather", ["USER", "ADMIN"]],
  ["/my-wardrobe", ["USER", "ADMIN"]],

  ["/dashboard", ["ADMIN"]],
] as const);
