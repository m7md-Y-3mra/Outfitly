import { z, ZodType } from "zod";
import { WardrobeItemSourceEnum } from "./types";
import {
  CreateWardrobeItemDTO,
  DeleteWardrobeItemDTO,
  GetUserWardrobeItemDTO,
  GetWardrobeItemDetailsDTO,
  UpdateWardrobeItemDTO,
  WardrobeSortBy,
} from "./types/dto.types";
import { WardrobeItem, WardrobeStyle } from "@/app/generated/prisma/browser";
import { createArrayFromDiscriminatedUnion } from "@/utils/types.utils";
import { SortOrder } from "@/app/generated/prisma/internal/prismaNamespace";
import { PAGE, PAGE_SIZE } from "@/app.constant";

// Base WardrobeItem schema
const WardrobeItemBaseSchema = z.object({
  id: z.string(), // auto-generated
  userId: z.uuid(),
  categoryId: z.string(),
  variantId: z.uuid().nullable(),
  style: z.enum(Object.values(WardrobeStyle)),

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
  categoryId: true,
  name: true,
  color: true,
  size: true,
  brand: true,
  season: true,
  notes: true,
  source: true,
  purchasedDate: true,
  imageUrls: true,
  style: true,
}) satisfies ZodType<CreateWardrobeItemDTO>;

// UPDATE schema - reuse WardrobeItemBaseWithImagesSchema for consistency
export const UpdateWardrobeItemDTOSchema = WardrobeItemBaseWithImagesSchema.pick({
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
  style: true,
  imageUrls: true, // Now reusing from WardrobeItemBaseWithImagesSchema
})
  .partial()
  .extend({
    id: z.string(), // ID is required
  }) satisfies ZodType<UpdateWardrobeItemDTO>;

// GET USER WARDROBE ITEM
export const GetUserWardrobeItemSchema = z.object({
  categoryId: z.string().optional(),
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

export const DeleteWardrobeItemSchema = WardrobeItemBaseSchema.pick({
  id: true,
}) satisfies ZodType<DeleteWardrobeItemDTO>;
