"use server";
import { zodValidation } from "@/utils/zod.utils";
import {
  CreateWardrobeItemDTOSchema,
  DeleteWardrobeItemSchema,
  GetUserWardrobeItemSchema,
  GetWardrobeItemDetailsSchema,
  UpdateWardrobeItemDTOSchema,
} from "./wardrobe.schema";
import {
  createWardrobeItemRepo,
  deleteWardrobeItemRepo,
  findWardrobeItemById,
  getUserWardrobeItemRepo,
  getWardrobeItemDetailsRepo,
  getWardrobeItemsFiltered,
  getWardrobeStatsRepo,
  updateWardrobeItemRepo,
} from "./wardrobe.repo";
import {
  CreateWardrobeItemResponse,
  DeleteWardrobeItemDTO,
  DeleteWardrobeItemResponse,
  GetUserWardrobeItemDTO,
  GetUserWardrobeItemResponse,
  GetWardrobeItemDetailsDTO,
  GetWardrobeItemDetailsResponse,
  GetWardrobeStatsResponse,
  UpdateWardrobeItemDTO,
  UpdateWardrobeItemResponse,
} from "./types/dto.types";
import { findCategoryById } from "../category/category.repo";
import { PAGE, PAGE_SIZE } from "@/app.constant";
import CustomError from "@/utils/CustomError";
import { HttpStatusError } from "@/@types/status-code.type";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { IGeneratorFilters } from "../AI-generator/types/generator.types";
import { CreateWardrobeItemDTO } from "./types/dto.types";

export const createWardrobeItemService = async (
  createWardrobeItemDTO: CreateWardrobeItemDTO,
): Promise<CreateWardrobeItemResponse> => {
  const data = zodValidation(CreateWardrobeItemDTOSchema, createWardrobeItemDTO);
  const user = await authMiddleware();
  const { imageUrls, ...rest } = data;

  await findCategoryById(rest.categoryId);

  const wardrobeItem = await createWardrobeItemRepo(
    {
      ...rest,
      userId: user.id,
      variantId: null, // Default to null
      source: "manual", // Default from schema
    },
    imageUrls,
  );
  return wardrobeItem;
};

export const updateWardrobeItemService = async (
  updateWardrobeItemDTO: UpdateWardrobeItemDTO,
): Promise<UpdateWardrobeItemResponse> => {
  const data = zodValidation(UpdateWardrobeItemDTOSchema, updateWardrobeItemDTO);
  const user = await authMiddleware();
  const { imageUrls, id, ...rest } = data;

  await findWardrobeItemById(id);
  if (rest.categoryId) await findCategoryById(rest.categoryId);

  // Pass imageUrls to repo - repo handles reconstruction
  const wardrobeItem = await updateWardrobeItemRepo(id, user.id, rest, imageUrls);
  return wardrobeItem;
};

export const getUserWardrobeService = async (
  getUserWardrobeItemDTO: GetUserWardrobeItemDTO,
): Promise<GetUserWardrobeItemResponse> => {
  const data = zodValidation(GetUserWardrobeItemSchema, getUserWardrobeItemDTO);

  const user = await authMiddleware();
  if (data.categoryId) await findCategoryById(data.categoryId);

  const { page, pageSize, ...rest } = data;
  const skip = ((page || PAGE) - 1) * (pageSize || PAGE_SIZE);
  return getUserWardrobeItemRepo({ ...{ userId: user.id, ...rest }, skip, take: pageSize });
};

export const getWardrobeItemDetailsService = async (
  getWardrobeItemDetailsDTO: GetWardrobeItemDetailsDTO,
): Promise<GetWardrobeItemDetailsResponse> => {
  const data = zodValidation(GetWardrobeItemDetailsSchema, getWardrobeItemDetailsDTO);

  const user = await authMiddleware();
  const wardrobeItemData = await findWardrobeItemById(data.id);

  if (user.id != wardrobeItemData.userId) {
    throw new CustomError({ message: "not authorized", statusCode: HttpStatusError.Unauthorized });
  }

  return getWardrobeItemDetailsRepo(data.id, user.id);
};

export const deleteWardrobeItemService = async (
  deleteWardrobeItemDTO: DeleteWardrobeItemDTO,
): Promise<DeleteWardrobeItemResponse> => {
  const data = zodValidation(DeleteWardrobeItemSchema, deleteWardrobeItemDTO);

  const user = await authMiddleware();
  const wardrobeItemData = await findWardrobeItemById(data.id);

  if (user.id != wardrobeItemData.id) {
    throw new CustomError({ message: "not authorized", statusCode: HttpStatusError.Unauthorized });
  }

  return deleteWardrobeItemRepo(data.id, user.id);
};

export const getWardrobeStatsService = async (): Promise<GetWardrobeStatsResponse> => {
  const user = await authMiddleware();
  return getWardrobeStatsRepo(user.id);
};

export const getFilteredItemsForGenerator = async (filters: IGeneratorFilters, userId: string) => {
  const items = await getWardrobeItemsFiltered(filters, userId);
  return items;
};
