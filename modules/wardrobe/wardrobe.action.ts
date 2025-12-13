"use server";
import { errorMiddleware } from "@/middlewares/error.middleware";
import {
  createWardrobeItemService,
  deleteWardrobeItemService,
  getUserWardrobeService,
  getWardrobeItemDetailsService,
  getWardrobeStatsService,
  updateWardrobeItemService,
} from "./wardrobe.service";

export const createWardrobeItemAction = errorMiddleware(createWardrobeItemService, {
  statusCode: 201,
  message: "Wardrobe item created successfully",
});

export const updateWardrobeItemAction = errorMiddleware(updateWardrobeItemService, {
  message: "Wardrobe item updated successfully",
});

export const getUserWardrobeItemAction = errorMiddleware(getUserWardrobeService);

export const getWardrobeItemDetailsAction = errorMiddleware(getWardrobeItemDetailsService);

export const deleteWardrobeItemAction = errorMiddleware(deleteWardrobeItemService);

export const getWardrobeStatsAction = errorMiddleware(getWardrobeStatsService);
