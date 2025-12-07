import { z, ZodType } from "zod";
import { WardrobeItemSourceEnum } from "./types";
import {
  CreateWardrobeItemDTO,
  GetUserWardrobeItemDTO,
  GetWardrobeItemDetailsDTO,
  UpdateWardrobeItemDTO,
  WardrobeSortBy,
} from "./types/dto.types";
import { WardrobeItem } from "@/app/generated/prisma/browser";
import { createArrayFromDiscriminatedUnion } from "@/utils/types.utils";
import { SortOrder } from "@/app/generated/prisma/internal/prismaNamespace";
import { PAGE, PAGE_SIZE } from "@/app.constant";

// Base WardrobeItem schema
const WardrobeItemBaseSchema = z.object({
  id: z.uuid(), // auto-generated
  userId: z.uuid(),
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

const WardrobeItemBaseWithImagesSchema = WardrobeItemBaseSchema.extend({
  imageUrls: z.array(z.string()).min(1, "At least one item is required"),
}) satisfies ZodType<WardrobeItem & { imageUrls: string[] }>;

// CREATE schema
export const CreateWardrobeItemDTOSchema = WardrobeItemBaseWithImagesSchema.pick({
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
  imageUrls: true,
}) satisfies ZodType<CreateWardrobeItemDTO>;

// UPDATE schema
export const UpdateWardrobeItemDTOSchema = WardrobeItemBaseSchema.pick({
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
})
  .extend({
    images: z.array(
      z.object({
        id: z.uuid(),
        imageUrl: z.string(),
        altText: z.string().nullable(),
        isPrimary: z.boolean(),
        displayOrder: z.number(),
        wardrobeItemId: z.uuid(),
      }),
    ),
  })
  .partial()
  .extend({
    id: z.string(), // auto-generated
    userId: z.string(),
  }) satisfies ZodType<UpdateWardrobeItemDTO>;

// GET USER WARDROBE ITEM
export const GetUserWardrobeItemSchema = z.object({
  userId: z.uuid(),
  categoryId: z.uuid().optional(),
  search: z.string().optional(),
  sortBy: z
    .enum(createArrayFromDiscriminatedUnion<WardrobeSortBy>("addedAt", "name"))
    .default("addedAt"),
  sortOrder: z.enum(createArrayFromDiscriminatedUnion<SortOrder>("asc", "desc")).default("desc"),
  page: z.number().default(PAGE),
  pageSize: z.number().default(PAGE_SIZE),
}) satisfies ZodType<GetUserWardrobeItemDTO>;

export const GetWardrobeItemDetailsSchema = WardrobeItemBaseSchema.pick({
  id: true,
}) satisfies ZodType<GetWardrobeItemDetailsDTO>;