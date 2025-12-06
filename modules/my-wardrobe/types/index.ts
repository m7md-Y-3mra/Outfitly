import { WardrobeItem, WardrobeItemImage } from "@/app/generated/prisma/browser";

export type WardrobeItemWithoutAddedAt = Omit<WardrobeItem, "addedAt">;

export type WardrobeItemWithoutAddedAtAndId = Omit<WardrobeItem, "addedAt" | "id">;

export type WardrobeItemWithImages = WardrobeItem & { images: WardrobeItemImage[] };

export const WardrobeItemSourceEnum = {
  manual: "manual",
  purchased: "purchased",
  AiSuggested: "ai-suggested",
} as const;

export type WardrobeItemSourceType = keyof typeof WardrobeItemSourceEnum;
