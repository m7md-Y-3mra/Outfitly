import { z, ZodType } from "zod";
import { WardrobeItemSourceEnum } from "./types";
import { CreateWardrobeItemDTO } from "./types/dto.types";
import { WardrobeItem } from "@/app/generated/prisma/browser";

// Base WardrobeItem schema
const WardrobeItemBaseSchema = z.object({
  id: z.uuid(), // auto-generated
  userId: z.string(),
  categoryId: z.string(),
  variantId: z.uuid().nullable(),

  name: z.string().min(1, "Name is required"),
  color: z.string().min(1, "Color is required"),
  size: z.string().min(1, "Size is required"),
  brand: z.string().min(1, "Brand is required"),
  season: z.string().min(1, "Season is required"),
  notes: z.string().optional().default(""),

  source: z.enum(Object.values(WardrobeItemSourceEnum)).default("manual"),

  addedAt: z.date(), // Prisma defaults now()
  purchasedDate: z.date(),
}) satisfies ZodType<WardrobeItem>;

// CREATE schema
export const CreateWardrobeItemDTOSchema = WardrobeItemBaseSchema.pick({
  userId: true,
  categoryId: true,
  variantId: true,
  name: true,
  color: true,
  size: true,
  brand: true,
  season: true,
  notes: true,
  source: true,
  purchasedDate: true,
}).extend({
  imageUrls: z.array(z.string()).min(1, "At least one item is required"),
}) satisfies ZodType<CreateWardrobeItemDTO>;
