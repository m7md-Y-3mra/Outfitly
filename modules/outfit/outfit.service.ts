"use server";
import { IPaginationQuery } from "@/@types/database.type";
import { Outfit } from "@/app/generated/prisma/client";
import {
  PrismaClientKnownRequestError,
  SortOrder,
} from "@/app/generated/prisma/internal/prismaNamespace";
import {
  createOutfit,
  findAll,
  getCount,
  getOutfitsForDashboard,
  getOutfitsForDashboardPaginated,
  getUniqueItemsFromOutfits,
  likeOutfit,
  unlikeOutfit,
  getPrivateOutfitsCount,
  getTotalLikesCount,
  deleteOutfitById,
} from "./outfit.repo";
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

export const getUsedItemsService = async () => {
  return await getUniqueItemsFromOutfits();
};

export const getOutfitsForDashboardService = async () => {
  return await getOutfitsForDashboard();
};

export const getOutfitsForDashboardServicePaginated = async (
  page: number = 1,
  limit: number = 10,
) => {
  return await getOutfitsForDashboardPaginated(page, limit);
};

export const getPrivateOutfitsCountService = async () => {
  return await getPrivateOutfitsCount();
};

export const getTotalLikesCountService = async () => {
  return await getTotalLikesCount();
};

export const deleteOutfitService = async (id: string) => {
  return await deleteOutfitById(id);
};
