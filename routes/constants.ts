export const PROTECTED_ROUTES = [
  "/ai-generator",
  "/profile",
  "/explore",
  "/weather",
  "/my-wardrobe",
  "/dashboard",
] as const;
export const AUTH_ROUTES = ["/sign-in", "/sign-up"] as const;
export const PUBLIC_ROUTES = ["/"] as const;
export const STATUS_ROUTES = ["/unauthorized", "/forbidden", "/already-logged"] as const;
