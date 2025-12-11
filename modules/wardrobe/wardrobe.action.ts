"use server";
import { actionHandler } from "@/utils/action-handler.utils";
import {
  createWardrobeItemService,
  deleteWardrobeItemService,
  getUserWardrobeService,
  getWardrobeItemDetailsService,
  getWardrobeStatsService,
  updateWardrobeItemService,
} from "./wardrobe.service";

export const createWardrobeItemAction = actionHandler(createWardrobeItemService, {
  statusCode: 201,
  message: "Wardrobe item created successfully",
});

export const updateWardrobeItemAction = actionHandler(updateWardrobeItemService, {
  message: "Wardrobe item updated successfully",
});

export const getUserWardrobeItemAction = actionHandler(getUserWardrobeService);

export const getWardrobeItemDetailsAction = actionHandler(getWardrobeItemDetailsService);

export const deleteWardrobeItemAction = actionHandler(deleteWardrobeItemService);

export const getWardrobeStatsAction = actionHandler(getWardrobeStatsService);
