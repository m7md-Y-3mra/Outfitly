import { WardrobeItem, WardrobeItemImage } from "@/app/generated/prisma/client";

export interface IGeneratorFilters {
  style: string;
  weather: string;
}

export interface IItemsForAI {
  name: WardrobeItem["name"];
  color: WardrobeItem["color"];
  notes: WardrobeItem["notes"];
  images: WardrobeItemImage[];
  season: WardrobeItem["season"];
}
