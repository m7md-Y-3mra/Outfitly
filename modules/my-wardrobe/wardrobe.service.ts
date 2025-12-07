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
  UpdateWardrobeItemDTO,
  UpdateWardrobeItemResponse,
} from "./types/dto.types";
import { CreateWardrobeItemDTO } from "./types/dto.types";
import userRepo from "../user/user.repo";
import { findCategoryById } from "../category/category.repo";
import { PAGE, PAGE_SIZE } from "@/app.constant";
import { getUserFromSession } from "../auth/auth.service";
import CustomError from "@/utils/CustomError";
import { HttpStatusError } from "@/@types/status-code.type";

export const createWardrobeItemService = async (
  CreateWardrobeItemDTO: CreateWardrobeItemDTO,
): Promise<CreateWardrobeItemResponse> => {
  const data = zodValidation(CreateWardrobeItemDTOSchema, CreateWardrobeItemDTO);
  const { imageUrls, ...rest } = data;

  await userRepo.findById(rest.userId);
  await findCategoryById(rest.categoryId);

  const wardrobeItem = await createWardrobeItemRepo(rest, imageUrls);
  return wardrobeItem;
};

export const updateWardrobeItemService = async (
  updateWardrobeItemDTO: UpdateWardrobeItemDTO,
): Promise<UpdateWardrobeItemResponse> => {
  const data = zodValidation(UpdateWardrobeItemDTOSchema, updateWardrobeItemDTO);
  const { images, id, userId, ...rest } = data;

  await userRepo.findById(userId);
  await findWardrobeItemById(id);
  if (rest.categoryId) await findCategoryById(rest.categoryId);

  const wardrobeItem = await updateWardrobeItemRepo(id, userId, rest, images);
  return wardrobeItem;
};

export const getUserWardrobeService = async (
  getUserWardrobeItemDTO: GetUserWardrobeItemDTO,
): Promise<GetUserWardrobeItemResponse> => {
  const data = zodValidation(GetUserWardrobeItemSchema, getUserWardrobeItemDTO);

  await userRepo.findById(data.userId);
  if (data.categoryId) await findCategoryById(data.categoryId);

  const { page, pageSize, ...rest } = data;
  const skip = ((page || PAGE) - 1) * (pageSize || PAGE_SIZE);
  return getUserWardrobeItemRepo({ ...rest, skip, take: pageSize });
};

export const getWardrobeItemDetailsService = async (
  getWardrobeItemDetailsDTO: GetWardrobeItemDetailsDTO,
): Promise<GetWardrobeItemDetailsResponse> => {
  const data = zodValidation(GetWardrobeItemDetailsSchema, getWardrobeItemDetailsDTO);

  const user = await getUserFromSession();

  const userData = await userRepo.findById(user.sub);
  const wardrobeItemData = await findWardrobeItemById(data.id);

  if (userData.id != wardrobeItemData.id) {
    throw new CustomError({ message: "not authorized", statusCode: HttpStatusError.Unauthorized });
  }

  return getWardrobeItemDetailsRepo(data.id, user.sub);
};

export const deleteWardrobeItemService = async (
  deleteWardrobeItemDTO: DeleteWardrobeItemDTO,
): Promise<DeleteWardrobeItemResponse> => {
  const data = zodValidation(DeleteWardrobeItemSchema, deleteWardrobeItemDTO);

  const user = await getUserFromSession();

  const userData = await userRepo.findById(user.sub);
  const wardrobeItemData = await findWardrobeItemById(data.id);

  if (userData.id != wardrobeItemData.id) {
    throw new CustomError({ message: "not authorized", statusCode: HttpStatusError.Unauthorized });
  }

  return deleteWardrobeItemRepo(data.id, user.sub);
};

export const getWardrobeStatsService = async () => {
  const user = await getUserFromSession();

  const userData = await userRepo.findById(user.sub);

  return getWardrobeStatsRepo(userData.id);
};