"use server";
import { getFilteredItemsForGenerator } from "../wardrobe/wardrobe.service";
import { IGeneratorFilters, IItemsForAI } from "./types/generator.types";

export const getItemsForGenerator = async (filters: IGeneratorFilters, userId: string) => {
  const items = await getFilteredItemsForGenerator(filters, userId);
  const itemsForReturn: IItemsForAI[] = items.map((item) => {
    return {
      id: item.id,
      category: item.category?.name,
      name: item.name,
      color: item.color,
      notes: item.notes,
      images: item.images,
      season: item.season,
    };
  });

  return itemsForReturn;
};
