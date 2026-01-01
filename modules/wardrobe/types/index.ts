import { WardrobeItem, WardrobeItemImage, Category } from "@/app/generated/prisma/browser";

export type WardrobeItemWithoutAddedAt = Omit<WardrobeItem, "addedAt">;

export type WardrobeItemWithoutAddedAtAndId = Omit<WardrobeItem, "addedAt" | "id">;

export type WardrobeItemWithoutAddedAtAndIdAndUserId = Omit<
  WardrobeItem,
  "addedAt" | "id" | "userId"
>;

export type WardrobeItemWithImages = WardrobeItem & {
  images: WardrobeItemImage[];
  category: Category | null;
};

export const WardrobeItemSourceEnum = {
  manual: "manual",
  purchased: "purchased",
  AiSuggested: "ai-suggested",
} as const;

export type WardrobeItemSourceType = keyof typeof WardrobeItemSourceEnum;
