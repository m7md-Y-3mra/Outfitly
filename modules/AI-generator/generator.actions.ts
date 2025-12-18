import { errorMiddleware } from "@/middlewares/error.middleware";
import { generateAIOutfit, getItemsForGenerator, getOccasionsForAI } from "./generator.service";
import { createOutfitService } from "../outfit/outfit.service";

export const getItemsForGeneratorAction = errorMiddleware(getItemsForGenerator, {
  statusCode: 200,
});

export const generateAIOutfitAction = errorMiddleware(generateAIOutfit, {
  statusCode: 200,
});

export const getOccasionsForAIAction = errorMiddleware(getOccasionsForAI, {
  statusCode: 200,
});

export const createOutfitAction = errorMiddleware(createOutfitService)
