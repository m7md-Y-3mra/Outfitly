import { IPaginationQuery, IPaginationResult } from "@/@types/database.type";
import { SortOrder } from "@/app/generated/prisma/internal/prismaNamespace";
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
  const { page = 1, limit = 10, order = "desc", field = "createdAt" } = query;
  const skip = (page - 1) * limit;

  const allOutfits = await prisma.outfit.findMany({
    where: { userId },
    include: { likedBy: true },
    skip,
    take: limit,
    orderBy: { [field]: order } as Record<string, SortOrder>,
  });

  const total = await prisma.outfit.count({ where: { userId } });
  const totalPages = Math.ceil(total / limit);

  const mappedData: UIOutfit[] = allOutfits.map((outfit) => ({
    id: typeof outfit.id === "string" ? parseInt(outfit.id, 10) : outfit.id,
    image: outfit.imageUrl || "",
    likes: outfit.likedBy.length,
    title: outfit.name,
    description: outfit.description || "",
    season: outfit.season || "",
    name: outfit.name,
  }));

  return { data: mappedData, meta: { total, page, limit, totalPages } };
};

// Find liked outfits paginated
export const findLikedOutfits = async (
  userId: string,
  query: IPaginationQuery,
): Promise<IPaginationResult<UIOutfit>> => {
  const { page = 1, limit = 10, order = "desc", field = "createdAt" } = query;
  const skip = (page - 1) * limit;

  const allOutfits = await prisma.outfit.findMany({
    where: { likedBy: { some: { id: userId } } },
    include: { likedBy: true },
    skip,
    take: limit,
    orderBy: { [field]: order } as Record<string, SortOrder>,
  });

  const total = await prisma.outfit.count({ where: { likedBy: { some: { id: userId } } } });
  const totalPages = Math.ceil(total / limit);

  const mappedData: UIOutfit[] = allOutfits.map((outfit) => ({
    id: typeof outfit.id === "string" ? parseInt(outfit.id, 10) : outfit.id,
    image: outfit.imageUrl || "",
    likes: outfit.likedBy.length,
    title: outfit.name,
    description: outfit.description || "",
    season: outfit.season || "",
    name: outfit.name,
  }));

  return { data: mappedData, meta: { total, page, limit, totalPages } };
};

// Find user wardrobe items paginated

export const findUserWardrobeItems = async (
  userId: string,
  query: IPaginationQuery,
): Promise<IPaginationResult<UIWardrobeItem>> => {
  const { page = 1, limit = 10, order = "desc", field = "addedAt" } = query;
  const skip = (page - 1) * limit;

  // Allowed fields mapping
  type WardrobeItemOrderFields = "addedAt" | "name";
  const allowedFields: WardrobeItemOrderFields[] = ["addedAt", "name"];
  const sortField: WardrobeItemOrderFields = allowedFields.includes(
    field as WardrobeItemOrderFields,
  )
    ? (field as WardrobeItemOrderFields)
    : "addedAt";

  const orderBy = { [sortField]: order } as const;

  const allItems = await prisma.wardrobeItem.findMany({
    where: { userId },
    include: { images: true, category: true },
    skip,
    take: limit,
    orderBy,
  });

  const total = await prisma.wardrobeItem.count({ where: { userId } });
  const totalPages = Math.ceil(total / limit);

  const mappedData: UIWardrobeItem[] = allItems.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.images?.[0]?.imageUrl || "",
    category: item.category?.name || "",
    season: item.season || "",
    style: item.style || "",
    createdAt: item.addedAt?.toISOString() || "",
  }));

  return { data: mappedData, meta: { total, page, limit, totalPages } };
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
