"use server";
import prisma from "@/lib/prisma";
import { WardrobeItemWithoutAddedAtAndId } from "./types";
import { WardrobeItemImage } from "@/app/generated/prisma/client";
import { MAX_IMAGES } from "./constant";
import { GetUserWardrobeRepoParams } from "./types/dto.types";
import { PAGE_SIZE } from "@/app.constant";

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

export const updateWardrobeItemRepo = async (
  id: string,
  userId: string,
  data: Partial<WardrobeItemWithoutAddedAtAndId>,
  images?: WardrobeItemImage[],
) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Update the wardrobe item fields
    await tx.wardrobeItem.update({
      where: { id, userId },
      data,
    });

    if (images) {
      // 2. Normalize images: enforce order 0 to 3, make first one primary
      const normalizedImages = images
        .slice(0, MAX_IMAGES) // extra safety
        .map((img, index) => ({
          ...img,
          displayOrder: index,
        }));

      // 3. Upsert each image (update or create)
      for (const [index, img] of normalizedImages.entries()) {
        const isPrimary = index === 0;

        if (img.id) {
          await tx.wardrobeItemImage.update({
            where: { id: img.id },
            data: {
              imageUrl: img.imageUrl,
              altText: data.name ?? undefined,
              isPrimary,
              displayOrder: index,
            },
          });
        } else {
          await tx.wardrobeItemImage.create({
            data: {
              wardrobeItemId: id,
              imageUrl: img.imageUrl,
              altText: data.name ?? undefined,
              isPrimary,
              displayOrder: index,
            },
          });
        }
      }

      // 4. Delete images that were removed
      const incomingIds = normalizedImages.map((img) => img.id).filter(Boolean) as string[];

      await tx.wardrobeItemImage.deleteMany({
        where: {
          wardrobeItemId: id,
          ...(incomingIds.length > 0 ? { id: { notIn: incomingIds } } : {}), // if no images → delete all
        },
      });
    }

    // 5. Return fresh data
    return await tx.wardrobeItem.findUniqueOrThrow({
      where: { id },
      include: {
        images: {
          orderBy: { displayOrder: "asc" },
        },
      },
    });
  });
};

export const findWardrobeItemById = async (id: string) => {
  return prisma.wardrobeItem.findUniqueOrThrow({
    where: {
      id,
    },
  });
};

export const getUserWardrobeItemRepo = async ({
  userId,
  categoryId,
  sortBy = "addedAt",
  sortOrder = "desc",
  search = "",
  take = PAGE_SIZE,
  skip = 0,
}: GetUserWardrobeRepoParams) => {
  const where = {
    userId,
    ...(categoryId && { categoryId }),
    ...(search && {
      name: {
        contains: search.trim(),
        mode: "insensitive" as const,
      },
    }),
  };

  const [items, total] = await prisma.$transaction([
    prisma.wardrobeItem.findMany({
      where,
      select: {
        id: true,
        name: true,
        category: true,
        color: true,
        addedAt: true,
        // Only the primary image (or first one)
        images: {
          where: { isPrimary: true },
          take: 1,
          select: {
            imageUrl: true,
            altText: true,
          },
          orderBy: { displayOrder: "asc" }, // fallback if multiple primaries exist
        },
      },
      orderBy: { [sortBy]: sortOrder },
      take,
      skip,
    }),

    prisma.wardrobeItem.count({ where }),
  ]);

  // Flatten: make primaryImage easily accessible
  const formattedItems = items.map((item) => {
    const { images, ...rest } = item;
    const primaryImage = images[0] ?? null;

    return {
      ...rest,
      primaryImageUrl: primaryImage?.imageUrl ?? null,
      primaryImageAlt: primaryImage?.altText ?? item.name,
      // remove the images array from output
    };
  });

  return {
    items: formattedItems,
    total,
    hasMore: skip + formattedItems.length < total,
    currentPage: Math.floor(skip / take) + 1,
    totalPages: Math.ceil(total / take),
  };
};

export const getWardrobeItemDetailsRepo = async (itemId: string, userId: string) => {
  return await prisma.wardrobeItem.findUnique({
    where: {
      id: itemId,
      // This ensures only user's own items are returned
      userId,
    },
    include: {
      images: {
        orderBy: { displayOrder: "asc" },
        select: {
          id: true,
          imageUrl: true,
          altText: true,
          isPrimary: true,
          displayOrder: true,
          wardrobeItemId: true,
        },
      },
    },
  });
};

export const getWardrobeStatsRepo = async (userId: string) => {
  const result = await prisma.wardrobeItem.groupBy({
    by: ["categoryId"],
    where: {
      userId,
    },
    _count: {
      _all: true,
    },
  });

  // Initialize all categories with 0
  //** I need inside the database */
  const byCategory: Record<string, number> = {
    TOP: 0,
    BOTTOM: 0,
    SHOES: 0,
    OUTERWEAR: 0,
    ACCESSORY: 0,
    DRESS: 0,
    BAG: 0,
    // Add any custom categories here
  };

  // Fill in the actual counts
  for (const item of result) {
    if (item.categoryId) {
      byCategory[item.categoryId] = item._count._all;
    }
  }

  return { byCategory };
};

export const deleteWardrobeItemRepo = async (
  itemId: string,
  userId: string,
) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Find the item + images (with ownership check)
    const item = await tx.wardrobeItem.findUnique({
      where: { id: itemId },
      include: {
        images: {
          select: {
            id: true,
            imageUrl: true,
          },
        },
      },
    });

    // 2. Security: not found OR not owned → throw
    if (!item || item.userId !== userId) {
      throw new Error("Item not found or not authorized");
    }

    // 3. Delete images first (foreign key constraint)
    await tx.wardrobeItemImage.deleteMany({
      where: { wardrobeItemId: itemId },
    });

    // 4. Delete the item
    const wardrobeItem = await tx.wardrobeItem.delete({
      where: { id: itemId },
    });

    // 5. Return success
    return wardrobeItem;
  });
};