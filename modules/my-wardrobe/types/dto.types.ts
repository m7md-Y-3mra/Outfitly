import { WardrobeItem, WardrobeItemImage } from "@/app/generated/prisma/browser";
import { WardrobeItemWithoutAddedAtAndId } from ".";

export type CreateWardrobeItemDTO = WardrobeItemWithoutAddedAtAndId & { imageUrls: string[] };
export type CreateWardrobeItemResponse = WardrobeItem & { images: WardrobeItemImage[] };
