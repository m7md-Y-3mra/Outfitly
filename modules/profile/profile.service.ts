"use server";

import { IPaginationQuery } from "@/@types/database.type";
import { Outfit } from "@/app/generated/prisma/client";
import {
  findUserProfile,
  findUserOutfits,
  findLikedOutfits,
  findLikedProducts,
  updateUserProfile,
  findUserWardrobeItems,
} from "./profile.repo";
import { zodValidation } from "@/utils/zod.utils";
import { profileListQuerySchema, profileUpdateSchema } from "./profile.validation";
import CustomError from "@/utils/CustomError";
import { SortOrder } from "@/app/generated/prisma/internal/prismaNamespace";

// Get user profile
export const getUserProfile = async (userId: string) => {
  const profile = await findUserProfile(userId);
  if (!profile) throw new CustomError({ message: "Profile not found", statusCode: 404 });
  return profile;
};

// Get user outfits paginated
export const getUserOutfitsPaginated = async (userId: string, query: IPaginationQuery) => {
  const {
    page,
    limit,
    order = "desc",
    field = "createdAt",
  } = zodValidation(profileListQuerySchema, query);
  return findUserOutfits(userId, { page, limit }, order, field);
};

// Get liked outfits paginated
export const getLikedOutfitsPaginated = async (userId: string, query: IPaginationQuery) => {
  const {
    page,
    limit,
    order = "desc",
    field = "createdAt",
  } = zodValidation(profileListQuerySchema, query);
  return findLikedOutfits(userId, { page, limit }, order, field);
};

// Get liked products paginated
export const getLikedProductsPaginated = async (userId: string, query: IPaginationQuery) => {
  const { page, limit } = zodValidation(profileListQuerySchema, query);
  return findLikedProducts(userId, { page, limit });
};

// Update profile
export const updateProfile = async (
  userId: string,
  data: { name?: string; bio?: string; location?: string; website?: string; avatarUrl?: string },
) => {
  const validData = zodValidation(profileUpdateSchema, data);
  try {
    return await updateUserProfile(userId, validData);
  } catch (error) {
    throw new CustomError({ message: "Failed to update profile", statusCode: 500 });
  }
};

export const getUserWardrobeItemsPaginated = async (userId: string, query: IPaginationQuery) => {
  const {
    page,
    limit,
    order = "desc",
    field = "createdAt",
  } = zodValidation(profileListQuerySchema, query);
  return findUserWardrobeItems(userId, { page, limit }, order, field);
};