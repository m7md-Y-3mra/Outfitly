"use server";
import { actionHandler } from "@/utils/action-handler.utils";
import {
  getOutfitsForExplore,
  likeOutfitForExplore,
  unlikeOutfitForExplore,
} from "./explore.service";

export const getOutfitsForExploreAction = actionHandler(getOutfitsForExplore, {
  statusCode: 200,
});

export const likeOutfitAction = actionHandler(likeOutfitForExplore);

export const unlikeOutfitAction = actionHandler(unlikeOutfitForExplore);
