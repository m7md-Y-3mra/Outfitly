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

export const getCount = () => {
  return prisma.outfit.count();
};

export const getUniqueItemsFromOutfits = () => {
  return prisma.outfitItem.findMany({
    select: { wardrobeItemId: true },
    distinct: ["wardrobeItemId"],
  });
};

export const getOutfitsForDashboard = () => {
  const outfits = prisma.outfit.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      visibility: true,
      user: { select: { fullName: true } },
      _count: {
        select: { likedBy: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return outfits;
};

export const getOutfitsForDashboardPaginated = async (page: number = 1, limit: number = 10) => {
  const pagination = createPaginationForPrisma({ page, limit });

  const [outfits, total] = await Promise.all([
    prisma.outfit.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        visibility: true,
        user: { select: { fullName: true } },
        _count: {
          select: { likedBy: true },
        },
      },
      orderBy: { createdAt: "desc" },
      ...pagination,
    }),
    prisma.outfit.count(),
  ]);

  return {
    data: outfits,
    meta: createPaginationMetaData(limit, page, total),
  };
};

export const getPrivateOutfitsCount = () => {
  return prisma.outfit.count({
    where: { visibility: "private" },
  });
};

export const getTotalLikesCount = async () => {
  const outfits = await prisma.outfit.findMany({
    select: {
      _count: {
        select: { likedBy: true },
      },
    },
  });
  return outfits.reduce((acc, o) => acc + o._count.likedBy, 0);
};

export const deleteOutfitById = (id: string) => {
  return prisma.outfit.delete({
    where: { id },
  });
};
