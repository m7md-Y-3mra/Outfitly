import { z } from "zod";

// Update profile schema
export const profileUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
  avatarUrl: z.string().optional(),
});

// Pagination list schema
export const profileListQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  order: z.enum(["asc", "desc"]).default("desc"),
  field: z.enum(["createdAt", "name"]).default("createdAt"),
});
