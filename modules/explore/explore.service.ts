"use server";
import { IPaginationQuery, IPaginationResult } from "@/@types/database.type";
import { addLikeOutfit, getAllOutfitsPaginated, removeLike } from "../outfit/outfit.service";
import { IOutfit } from "./types/explore.type";
import { User } from "@/app/generated/prisma/client";
import { isUserLike } from "./utils";

export const getOutfitsForExplore = async (
  query: IPaginationQuery = { limit: 10, page: 1 },
  userId: User["id"],
): Promise<IPaginationResult<IOutfit>> => {
  const outfits = await getAllOutfitsPaginated(query);

  const { data: outfitsData, meta } = outfits;

  const outfitsWithIsLiked: IOutfit[] = outfitsData.map((outfit) => ({
    id: outfit.id,
    image: outfit.imageUrl,
    username: outfit.user.fullName ?? "Unknown user",
    likes: outfit.likedBy.length,
    isLiked: isUserLike(outfit.likedBy, userId),
    style: outfit.occasion?.name,
    season: outfit.items[0]?.wardrobeItem?.season || "All Seasons",
  }));

  return {
    data: outfitsWithIsLiked,
    meta,
  };
};

export const likeOutfitForExplore = async (outfitId: string, userId: string) => {
  return addLikeOutfit(userId, outfitId);
};

export const unlikeOutfitForExplore = async (outfitId: string, userId: string) => {
  return removeLike(userId, outfitId);
};
