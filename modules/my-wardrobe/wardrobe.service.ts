"use server";
import { zodValidation } from "@/utils/zod.utils";
import { CreateWardrobeItemDTOSchema } from "./wardrobe.schema";
import { createWardrobeItemRepo } from "./wardrobe.repo";
import { ApiResponseSuccess } from "@/types/response.type";
import { CreateWardrobeItemResponse } from "./types/dto.types";
import { CreateWardrobeItemDTO } from "./types/dto.types";
import userRepo from "../user/user.repo";
import { findCategoryById } from "../category/category.repo";

export const createWardrobeItemService = async (
  CreateWardrobeItemDTO: CreateWardrobeItemDTO,
): Promise<ApiResponseSuccess<CreateWardrobeItemResponse>> => {
  const data = zodValidation(CreateWardrobeItemDTOSchema, CreateWardrobeItemDTO);
  const { imageUrls, ...rest } = data;

  await userRepo.findById(rest.userId);
  await findCategoryById(rest.categoryId);

  const wardrobeItem = await createWardrobeItemRepo(rest, imageUrls);

  return {
    success: true,
    data: wardrobeItem,
    statusCode: 200,
    message: "wardrobeItem is created successfully",
  };
};
