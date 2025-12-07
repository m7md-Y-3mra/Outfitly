import { WardrobeItemImage, WardrobeItem } from "@/app/generated/prisma/browser";
import { WardrobeItemWithImages, WardrobeItemWithoutAddedAtAndId } from ".";
import { SortOrder } from "@/app/generated/prisma/internal/prismaNamespace";

export type CreateWardrobeItemDTO = WardrobeItemWithoutAddedAtAndId & { imageUrls: string[] };
export type CreateWardrobeItemResponse = WardrobeItemWithImages;

export type UpdateWardrobeItemDTO = Partial<
  WardrobeItemWithoutAddedAtAndId & { images: WardrobeItemImage[] }
> & { id: string; userId: string };
export type UpdateWardrobeItemResponse = WardrobeItemWithImages;

export type WardrobeSortBy = keyof Pick<WardrobeItem, "name" | "addedAt">;

export type GetUserWardrobeItem = {
  userId: string;
  categoryId?: string;
  sortBy?: WardrobeSortBy;
  sortOrder?: SortOrder;
  search?: string;
};

export type GetUserWardrobeItemDTO = GetUserWardrobeItem & {
  skip?: number;
  take?: number;
};

export type GetUserWardrobeRepoParams = GetUserWardrobeItemDTO & {
  page?: number;
  pageSize?: number;
};;
