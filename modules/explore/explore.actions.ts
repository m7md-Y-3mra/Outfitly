"use server";
import { errorMiddleware } from "@/middlewares/error.middleware";
import {
  getOutfitsForExplore,
  likeOutfitForExplore,
  unlikeOutfitForExplore,
} from "./explore.service";

export const getOutfitsForExploreAction = errorMiddleware(getOutfitsForExplore, {
  statusCode: 200,
});

export const likeOutfitAction = errorMiddleware(likeOutfitForExplore);

export const unlikeOutfitAction = errorMiddleware(unlikeOutfitForExplore);
