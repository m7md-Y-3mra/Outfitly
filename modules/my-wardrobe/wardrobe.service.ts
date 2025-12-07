"use server";
import { zodValidation } from "@/utils/zod.utils";
import { CreateWardrobeItemDTOSchema, GetUserWardrobeItemSchema, UpdateWardrobeItemDTOSchema } from "./wardrobe.schema";
import {
  createWardrobeItemRepo,
  findWardrobeItemById,
  getUserWardrobeItemRepo,
  updateWardrobeItemRepo,
} from "./wardrobe.repo";
import {
  CreateWardrobeItemResponse,
  GetUserWardrobeItemDTO,
  GetUserWardrobeItemResponse,
  UpdateWardrobeItemDTO,
  UpdateWardrobeItemResponse,
} from "./types/dto.types";
import { CreateWardrobeItemDTO } from "./types/dto.types";
import userRepo from "../user/user.repo";
import { findCategoryById } from "../category/category.repo";
import { PAGE, PAGE_SIZE } from "@/app.constant";

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