"use server";
import { actionHandler } from "@/utils/action-handler.utils";
import { createWardrobeItemService } from "./wardrobe.service";

export const createWardrobeItemAction = actionHandler(createWardrobeItemService);
