"use server";
import { actionHandler } from "@/utils/action-handler.utils";
import { createWardrobeItemService, updateWardrobeItemService } from "./wardrobe.service";

export const createWardrobeItemAction = actionHandler(createWardrobeItemService, {
  statusCode: 201,
  message: "Wardrobe item created successfully",
});

export const updateWardrobeItemAction = actionHandler(updateWardrobeItemService, {
  message: "Wardrobe item updated successfully",
});
