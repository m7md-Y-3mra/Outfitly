import { WardrobeItemImage, WardrobeItem, Category } from "@/app/generated/prisma/browser";
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

export type GetUserWardrobeRepoParams = GetUserWardrobeItemDTO & {
  skip?: number;
  take?: number;
};

export type GetUserWardrobeItemDTO = GetUserWardrobeItem & {
  page?: number;
  pageSize?: number;
};
export type GetUserWardrobeItemResponse = {
  items: {
    primaryImageUrl: string;
    primaryImageAlt: string;
    name: string;
    id: string;
    color: string;
    addedAt: Date;
    category: Category | null;
  }[];
  total: number;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
};

export type GetWardrobeItemDetailsDTO = { id: string };