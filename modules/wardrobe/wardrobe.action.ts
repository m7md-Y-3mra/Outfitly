"use server";
import { revalidateTag } from "next/cache";
import { errorMiddleware } from "@/middlewares/error.middleware";
import {
  createWardrobeItemService,
  deleteWardrobeItemService,
  getUserWardrobeService,
  getWardrobeItemDetailsService,
  getWardrobeStatsService,
  updateWardrobeItemService,
} from "./wardrobe.service";
import type {
  CreateWardrobeItemDTO,
  DeleteWardrobeItemDTO,
  UpdateWardrobeItemDTO,
} from "./types/dto.types";

// Wrapper functions with cache invalidation
const createWardrobeItemWithCache = async (data: CreateWardrobeItemDTO) => {
  const result = await createWardrobeItemService(data);
  revalidateTag("products", "default");
  return result;
};

const updateWardrobeItemWithCache = async (data: UpdateWardrobeItemDTO) => {
  const result = await updateWardrobeItemService(data);
  revalidateTag("products", "default");
  return result;
};

const deleteWardrobeItemWithCache = async (data: DeleteWardrobeItemDTO) => {
  const result = await deleteWardrobeItemService(data);
  revalidateTag("products", "default");
  return result;
};

export const createWardrobeItemAction = errorMiddleware(createWardrobeItemWithCache, {
  statusCode: 201,
  message: "Wardrobe item created successfully",
});

export const updateWardrobeItemAction = errorMiddleware(updateWardrobeItemWithCache, {
  message: "Wardrobe item updated successfully",
});

export const deleteWardrobeItemAction = errorMiddleware(deleteWardrobeItemWithCache);

export const getUserWardrobeItemAction = errorMiddleware(getUserWardrobeService);

export const getWardrobeItemDetailsAction = errorMiddleware(getWardrobeItemDetailsService);

export const getWardrobeStatsAction = errorMiddleware(getWardrobeStatsService);
