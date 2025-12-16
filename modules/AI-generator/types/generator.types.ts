import { WardrobeItem, WardrobeItemImage } from "@/app/generated/prisma/client";

export interface IGeneratorFilters {
  style: string;
  weather: string;
}

export interface IItemsForAI {
  id: WardrobeItem["id"];
  name: WardrobeItem["name"];
  color: WardrobeItem["color"];
  notes: WardrobeItem["notes"];
  images: WardrobeItemImage['imageUrl'];
  season: WardrobeItem["season"];
}

export type AIOutfitResponse = {
  name: string;
  description?: string;
  imageUrl?: string;
  style?: string,
  occasion?:
    | { id: string }
    | { name: string; description?: string };
  wardrobeItemIds: string[];
};

export type AIOutfitBatchResponse = {
  outfits: AIOutfitResponse[];
};


export type TDot = {
  id: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
};

export interface IUserRequirements {
  weather: string,
  style: string,
  occasion: string,
  requirments: string,
}

