"use server";
import { IPaginationQuery } from "@/@types/database.type";
import {
  findUserProfile,
  findUserOutfits,
  findLikedOutfits,
  updateUserProfile,
  findUserWardrobeItems,
} from "./profile.repo";
import { zodValidation } from "@/utils/zod.utils";
import { profileListQuerySchema, profileUpdateSchema } from "./profile.validation";
import CustomError from "@/utils/CustomError";

export const getUserProfile = async (userId: string) => {
  const profile = await findUserProfile(userId);
  if (!profile) throw new CustomError({ message: "Profile not found", statusCode: 404 });
  return profile;
};

export const getUserOutfitsPaginated = async (userId: string, query: IPaginationQuery) => {
  const validatedQuery = zodValidation(profileListQuerySchema, query);
  return findUserOutfits(userId, validatedQuery);
};

export const getLikedOutfitsPaginated = async (userId: string, query: IPaginationQuery) => {
  const validatedQuery = zodValidation(profileListQuerySchema, query);
  return findLikedOutfits(userId, validatedQuery);
};

export const getUserWardrobeItemsPaginated = async (userId: string, query: IPaginationQuery) => {
  const validatedQuery = zodValidation(profileListQuerySchema, query);
  return findUserWardrobeItems(userId, validatedQuery);
};

export const updateProfile = async (
  userId: string,
  data: { name?: string; bio?: string; location?: string; website?: string; avatarUrl?: string },
) => {
  const validData = zodValidation(profileUpdateSchema, data);
  try {
    return await updateUserProfile(userId, validData);
  } catch {
    throw new CustomError({ message: "Failed to update profile", statusCode: 500 });
  }
};
