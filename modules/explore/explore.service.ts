import { IPaginationQuery, IPaginationResult } from "@/@types/database.type";
import { getAllOutfitsPaginated } from "../outfit/outfit.service";
import { IOutfit } from "./types/explore.type";
import { User } from "@/app/generated/prisma/client";
import { isUserLike } from "./utils";

export const getOutfitsForExplore = async (
  query: IPaginationQuery,
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
      season: outfit.items[0]?.wardrobeItem?.season,
  }));

  return {
    data: outfitsWithIsLiked,
    meta,
  };
};
