import { WardrobeItemImage } from "@/app/generated/prisma/browser";
import { WardrobeItemWithImages, WardrobeItemWithoutAddedAtAndId } from ".";

export type CreateWardrobeItemDTO = WardrobeItemWithoutAddedAtAndId & { imageUrls: string[] };
export type CreateWardrobeItemResponse = WardrobeItemWithImages;

export type UpdateWardrobeItemDTO = Partial<
  WardrobeItemWithoutAddedAtAndId & { images: WardrobeItemImage[] }
> & { id: string; userId: string };
export type UpdateWardrobeItemResponse = WardrobeItemWithImages;
