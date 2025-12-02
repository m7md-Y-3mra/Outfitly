import { User } from "@/app/generated/prisma/client";
import { z, ZodType } from "zod";

export const userValidationSchema = z.object({
  id: z.string(),
  fullName: z.string().min(1).max(255).nullable(),
  email: z.email().toLowerCase(),
  emailVerified: z.boolean(),
  password: z.string().min(8),
  avatarUrl: z.url().nullable(),
  isActive: z.boolean(),
  lastLogin: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
}) satisfies ZodType<User>;
