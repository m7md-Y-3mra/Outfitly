"use server";
import { IPaginationQuery } from "@/@types/database.type";
import { Outfit } from "@/app/generated/prisma/client";
import {
  PrismaClientKnownRequestError,
  SortOrder,
} from "@/app/generated/prisma/internal/prismaNamespace";
import { createOutfit, findAll, getCount, likeOutfit, unlikeOutfit } from "./outfit.repo";
import { zodValidation } from "@/utils/zod.utils";
import { outfitListQuerySchema } from "./validation/outfit.validation";
import CustomError from "@/utils/CustomError";
import { CreateOutfitDTO } from "./types/outfit.dto";

export const getAllOutfitsPaginated = async (
  query: IPaginationQuery,
  order: SortOrder = "desc",
  field: Extract<keyof Outfit, "createdAt" | "name"> = "createdAt",
) => {
  const validData = zodValidation(outfitListQuerySchema, { ...query, order, field });
  const validQuery = { page: validData.page, limit: validData.limit };
  return findAll(validQuery, validData.order, validData.field);
};

export const addLikeOutfit = async (userId: string, outfitId: string) => {
  try {
    return await likeOutfit(outfitId, userId);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
      throw new CustomError({ message: "You already liked the outfit!", statusCode: 409 });
    }
    throw error;
  }
};

export const removeLike = async (userId: string, outfitId: string) => {
  return unlikeOutfit(outfitId, userId);
};

export const createOutfitService = async (data: CreateOutfitDTO) => {
  return await createOutfit(data);
};

export const getOutfitsCount = async () => {
  return await getCount();
};
