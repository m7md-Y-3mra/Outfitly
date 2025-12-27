import { IPaginationQuery, IPaginationResult } from "@/@types/database.type";
import { Outfit } from "@/app/generated/prisma/client";
import { SortOrder } from "@/app/generated/prisma/internal/prismaNamespace";
import { createPaginationForPrisma, createPaginationMetaData } from "@/lib/database.util";
import prisma from "@/lib/prisma";
import type {
  User as UIUser,
  Outfit as UIOutfit,
  WardrobeItem as UIWardrobeItem,
} from "./profile.types";

// Find user profile
export const findUserProfile = async (userId: string): Promise<UIUser | null> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { outfits: true, likedOutfits: true, favoriteOutfits: true },
  });

  if (!user) return null;

  const profile: UIUser = {
    id: user.id,
    name: user.fullName || "",
    username: user.email,
    bio: user.bio || "",
    location: user.location || "",
    website: user.website || "",
    joinDate: user.createdAt.toISOString().split("T")[0],
    avatarUrl: user.avatarUrl || "",
    stats: {
      outfits: user.outfits.length,
      followers: user.likedOutfits.length,
      following: user.favoriteOutfits.length,
    },
  };

  return profile;
};

// Find user outfits paginated
export const findUserOutfits = async (
  userId: string,
  query: IPaginationQuery,
): Promise<IPaginationResult<UIOutfit>> => {
  const pagination = createPaginationForPrisma(query);
  const allOutfits = await prisma.outfit.findMany({
    where: { userId },
    include: { likedBy: true },

    ...pagination,
  });

  const total = await prisma.outfit.count({ where: { userId } });
  const meta = createPaginationMetaData(query.limit, query.page, total);

  const mappedData: UIOutfit[] = allOutfits.map((outfit) => ({
    id: parseInt(outfit.id, 10),
    image: outfit.imageUrl || "",
    likes: outfit.likedBy.length,
    title: outfit.name,
    description: outfit.description || "",
    season: outfit.season || "",
    name: outfit.name,
  }));

  return { data: mappedData, meta };
};
// Find user wardrobe items paginated
export const findUserWardrobeItems = async (
  userId: string,
  query: IPaginationQuery,
): Promise<IPaginationResult<UIWardrobeItem>> => {
  const { page, limit, order = "desc", field = "addedAt" } = query;

  const pagination = createPaginationForPrisma({ page, limit });

  // Construct orderBy: Use type assertion to allow dynamic keys (Prisma's typing is strict)
  const orderBy = (field && order ? { [field]: order } : { addedAt: "desc" }) as Record<
    string,
    SortOrder
  >;

  const allItems = await prisma.wardrobeItem.findMany({
    where: { userId },
    include: { images: true, category: true },
    orderBy,
    ...pagination,
  });

  const total = await prisma.wardrobeItem.count({ where: { userId } });
  const meta = createPaginationMetaData(limit, page, total);

  const mappedData: UIWardrobeItem[] = allItems.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.images[0]?.imageUrl || "",
    category: item.category?.name || "",
    season: item.season,
    style: item.style,
  }));

  return { data: mappedData, meta };
};
// Find liked outfits paginated
export const findLikedOutfits = async (
  userId: string,
  query: IPaginationQuery,
): Promise<IPaginationResult<UIOutfit>> => {
  const pagination = createPaginationForPrisma(query);
  const allOutfits = await prisma.outfit.findMany({
    where: { likedBy: { some: { id: userId } } },
    include: { likedBy: true },
    ...pagination,
  });

  const total = await prisma.outfit.count({ where: { likedBy: { some: { id: userId } } } });
  const meta = createPaginationMetaData(query.limit, query.page, total);

  const mappedData: UIOutfit[] = allOutfits.map((outfit) => ({
    id: parseInt(outfit.id, 10),
    image: outfit.imageUrl || "",
    likes: outfit.likedBy.length,
    title: outfit.name,
    description: outfit.description || "",
    season: outfit.season || "",
    name: outfit.name,
  }));

  return { data: mappedData, meta };
};

// Update user profile
export const updateUserProfile = async (
  userId: string,
  data: { name?: string; bio?: string; location?: string; website?: string; avatarUrl?: string },
) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      fullName: data.name,
      bio: data.bio,
      location: data.location,
      website: data.website,
      avatarUrl: data.avatarUrl,
    },
  });
};
