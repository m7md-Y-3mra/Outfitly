import { IPaginationQuery, IPaginationResult } from "@/@types/database.type";
import { Outfit, User } from "@/app/generated/prisma/client";
import { SortOrder } from "@/app/generated/prisma/internal/prismaNamespace";
import { createPaginationForPrisma, createPaginationMetaData } from "@/lib/database.util";
import prisma from "@/lib/prisma";
import type { User as UIUser, Outfit as UIOutfit, LikedProduct, WardrobeItem as UIWardrobeItem, WardrobeItem } from "./profile.types";

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
  order: SortOrder,
  field: Extract<keyof Outfit, "createdAt" | "name">,
): Promise<IPaginationResult<UIOutfit>> => {
  const pagination = createPaginationForPrisma(query);
  const allOutfits = await prisma.outfit.findMany({
    where: { userId },
    include: { likedBy: true },
    orderBy: { [field]: order },
    ...pagination,
  });

  const total = await prisma.outfit.count({ where: { userId } });
  const meta = createPaginationMetaData(query.limit, query.page, total);

  const mappedData: UIOutfit[] = allOutfits.map((outfit) => ({
    id: parseInt(outfit.id, 10),
    image: outfit.imageUrl || "",
    likes: outfit.likedBy.length,
    title: outfit.name,
    description:outfit.description || "",
    season:outfit.season || "", 
    name:outfit.name
  }));

  return { data: mappedData, meta };
};

// Find liked outfits paginated
export const findLikedOutfits = async (
  userId: string,
  query: IPaginationQuery,
  order: SortOrder,
  field: Extract<keyof Outfit, "createdAt" | "name">,
): Promise<IPaginationResult<UIOutfit>> => {
  const pagination = createPaginationForPrisma(query);
  const allOutfits = await prisma.outfit.findMany({
    where: { likedBy: { some: { id: userId } } },
    include: { likedBy: true },
    orderBy: { [field]: order },
    ...pagination,
  });

  const total = await prisma.outfit.count({ where: { likedBy: { some: { id: userId } } } });
  const meta = createPaginationMetaData(query.limit, query.page, total);

  const mappedData: UIOutfit[] = allOutfits.map((outfit) => ({
    id: parseInt(outfit.id, 10),
    image: outfit.imageUrl || "",
    likes: outfit.likedBy.length,
    title: outfit.name,
    description:outfit.description || "",
    season:outfit.season || "", 
    name:outfit.name
  }));

  return { data: mappedData, meta };
};

// Find liked products paginated
export const findLikedProducts = async (
  userId: string,
  query: IPaginationQuery,
): Promise<IPaginationResult<LikedProduct>> => {
  const pagination = createPaginationForPrisma(query);
  const allProducts = await prisma.productReview.findMany({
    where: { userId, rating: { gte: 4 } },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          images: { where: { isPrimary: true }, select: { imageUrl: true } },
          variants: { select: { additionalPrice: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
    ...pagination,
  });

  const total = await prisma.productReview.count({ where: { userId, rating: { gte: 4 } } });
  const meta = createPaginationMetaData(query.limit, query.page, total);

  const mappedData: LikedProduct[] = allProducts.map((review) => ({
    id: parseInt(review.product.id, 10),
    image: review.product.images[0]?.imageUrl || "",
    name: review.product.name,
    price: `$${(review.product.variants[0]?.additionalPrice || 0).toFixed(2)}`,
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

export const findUserWardrobeItems = async (
  userId: string,
  query: IPaginationQuery,
): Promise<IPaginationResult<UIWardrobeItem>> => {
  const { page, limit, order = "desc", field = "addedAt" } = query;

  const pagination = createPaginationForPrisma({ page, limit });

  // Construct orderBy: Use type assertion to allow dynamic keys (Prisma's typing is strict)
  const orderBy = (field && order ? { [field]: order } : { addedAt: "desc" }) as Record<string, SortOrder>;

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
