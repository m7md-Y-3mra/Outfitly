"use server";
import prisma from "@/lib/prisma";
import { WardrobeItemWithoutAddedAtAndId } from "./types";

export const createWardrobeItemRepo = async (
  data: WardrobeItemWithoutAddedAtAndId,
  imageUrls: string[],
) => {
  return await prisma.wardrobeItem.create({
    data: {
      ...data,
      images: {
        create: imageUrls.map((url, i) => ({
          imageUrl: url,
          altText: data.name,
          isPrimary: i === 0,
          displayOrder: i,
        })),
      },
    },
    include: {
      images: true,
    },
  });
};
