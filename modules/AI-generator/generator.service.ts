"use server";
import { getAllOccasions } from "../outfit/outfit.repo";
import { getFilteredItemsForGenerator } from "../wardrobe/wardrobe.service";
import { normalizeResponse } from "./ai.utils";
import { IGeneratorFilters, IItemsForAI } from "./types/generator.types";
import { GoogleGenAI } from "@google/genai";


export const getItemsForGenerator = async (filters: IGeneratorFilters, userId: string) => {
  const items = await getFilteredItemsForGenerator(filters, userId);
  const itemsForReturn: IItemsForAI[] = items.map((item) => {
    return {
      id: item.id,
      category: item.category?.name,
      name: item.name,
      color: item.color,
      notes: item.notes,
      images: item.images[0].imageUrl,
      season: item.season,
    };
  });

  return itemsForReturn;
};


const ai = new GoogleGenAI({
  // Recommended: put your key in env, don't hardcode it
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateAIOutfit = async (prompt: string) => {
    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return normalizeResponse(res.text || "");
};

export const getOccasionsForAI = async() => {
  return await getAllOccasions()
}