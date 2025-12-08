import { IPaginationQuery } from "@/@types/database.type";
import { Outfit } from "@/app/generated/prisma/client";
import { SortOrder } from "@/app/generated/prisma/internal/prismaNamespace";
import { findAll, likeOutfit } from "./outfit.repo";
import { zodValidation } from "@/utils/zod.utils";
import { outfitListQuerySchema } from "./validation/outfit.validation";

export const getAllOutfitsPaginated = (
  query: IPaginationQuery,
  order: SortOrder = "desc",
  field: Extract<keyof Outfit, "createdAt" | "name"> = "createdAt",
) => {
  const validData = zodValidation(outfitListQuerySchema, {...query, order, field})
  const validQuery = {page: validData.page, limit: validData.limit}
  return findAll(validQuery, validData.order, validData.field);
};

export const addLikeOutfit = (userId: string, outfitId: string) => {
    return likeOutfit(outfitId, userId)
}