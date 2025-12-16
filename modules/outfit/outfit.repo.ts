import { IPaginationQuery, IPaginationResult } from "@/@types/database.type";
import { Outfit } from "@/app/generated/prisma/client";
import { SortOrder } from "@/app/generated/prisma/internal/prismaNamespace";
import { createPaginationForPrisma, createPaginationMetaData } from "@/lib/database.util";
import prisma from "@/lib/prisma";
import { CreateOutfitDTO, TLikeOutfitDTO, TOutfitDTO } from "./types/outfit.dto";

export const findAll = async (
  query: IPaginationQuery,
  order: SortOrder,
  field: Extract<keyof Outfit, "createdAt" | "name">,
): Promise<IPaginationResult<TOutfitDTO>> => {
  const outfits = await prisma.$transaction(async (tx) => {
    const pagination = createPaginationForPrisma(query);
    const allOutfits = await tx.outfit.findMany({
      include: {
        likedBy: {
          select: {
            id: true,
          },
        },
        occasion: {
          select: { name: true },
        },
        items: {
          select: {
            wardrobeItem: {
              select: { season: true },
            },
          },
        },
        user: {
          select: {
            id: true,
            fullName: true,
          },
        },
      },
      orderBy: {
        [field]: order,
      },
      ...pagination,
    });

    const total = await tx.outfit.count();

    const meta = createPaginationMetaData(query.limit, query.page, total);

    return {
      data: allOutfits,
      meta,
    };
  });
  return outfits;
};
export const likeOutfit = (outfitId: string, userId: string): Promise<TLikeOutfitDTO> => {
  return prisma.outfit.update({
    where: { id: outfitId },
    data: {
      likedBy: { connect: { id: userId } },
    },
    select: {
      id: true,
      _count: {
        select: { likedBy: true },
      },
    },
  });
};

export const unlikeOutfit = (outfitId: string, userId: string): Promise<TLikeOutfitDTO> => {
  return prisma.outfit.update({
    where: { id: outfitId },
    data: {
      likedBy: { disconnect: { id: userId } },
    },
    select: {
      id: true,
      _count: {
        select: { likedBy: true },
      },
    },
  });
};


export const createOutfit = (outfit: CreateOutfitDTO) => {
  return prisma.outfit.create({
    data: outfit,
  });
};

export const getAllOccasions = () => {
  return prisma.occasion.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
  });
};
