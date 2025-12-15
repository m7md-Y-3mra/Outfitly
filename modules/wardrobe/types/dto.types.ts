import { WardrobeItemImage, WardrobeItem, Category } from "@/app/generated/prisma/browser";
import { WardrobeItemWithImages, WardrobeItemWithoutAddedAtAndIdAndUserId } from ".";
import { SortOrder } from "@/app/generated/prisma/internal/prismaNamespace";
import { Prisma } from "@/app/generated/prisma/client";

export type CreateWardrobeItemDTO = WardrobeItemWithoutAddedAtAndIdAndUserId & {
  imageUrls: string[];
};
export type CreateWardrobeItemResponse = WardrobeItemWithImages;

export type UpdateWardrobeItemDTO = Partial<
  WardrobeItemWithoutAddedAtAndIdAndUserId & { images: WardrobeItemImage[] }
> & { id: string };
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

export type GetUserWardrobeItemDTO = Omit<GetUserWardrobeItem, "userId"> & {
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
export type GetWardrobeItemDetailsResponse = WardrobeItemWithImages | null;

export type DeleteWardrobeItemDTO = { id: string };
export type DeleteWardrobeItemResponse = WardrobeItem;

export type GetWardrobeStatsResponse = {
  total: number;
  byCategory: Record<string, number>;
};

export type FilteredItemsDTO = Prisma.WardrobeItemGetPayload<{
  include: {
    category: true;
    images: true;
  };
}>;
