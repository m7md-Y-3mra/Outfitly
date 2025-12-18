"use server";
import Groq from "groq-sdk";
import { getAllOccasions } from "../outfit/outfit.repo";
import { getFilteredItemsForGenerator } from "../wardrobe/wardrobe.service";
import { normalizeResponse } from "./ai.utils";
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
      images: item.images[0].imageUrl,
      season: item.season,
    };
  });

  return itemsForReturn;
};

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export const generateAIOutfit = async (prompt: string) => {
  const res = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const text = res.choices?.[0]?.message?.content ?? "";
  return normalizeResponse(text);
};

export const getOccasionsForAI = async () => {
  return await getAllOccasions();
};
