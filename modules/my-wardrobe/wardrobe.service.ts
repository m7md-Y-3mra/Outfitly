"use server";
import { zodValidation } from "@/utils/zod.utils";
import { CreateWardrobeItemDTOSchema, UpdateWardrobeItemDTOSchema } from "./wardrobe.schema";
import {
  createWardrobeItemRepo,
  findWardrobeItemById,
  updateWardrobeItemRepo,
} from "./wardrobe.repo";
import {
  CreateWardrobeItemResponse,
  UpdateWardrobeItemDTO,
  UpdateWardrobeItemResponse,
} from "./types/dto.types";
import { CreateWardrobeItemDTO } from "./types/dto.types";
import userRepo from "../user/user.repo";
import { findCategoryById } from "../category/category.repo";

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
