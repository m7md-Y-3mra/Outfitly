"use server";
import prisma from "@/lib/prisma";
import { WardrobeItemWithoutAddedAtAndId } from "./types";
import { MAX_IMAGES } from "./constant";
import { FilteredItemsDTO, GetUserWardrobeRepoParams } from "./types/dto.types";
import { PAGE_SIZE } from "@/app.constant";
import { IGeneratorFilters } from "../AI-generator/types/generator.types";
import { cacheTag } from "next/cache";

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
  imageUrls?: string[],
) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Update the wardrobe item fields
    await tx.wardrobeItem.update({
      where: { id, userId },
      data,
    });

    if (imageUrls !== undefined) {
      // 2. Fetch existing images to preserve metadata
      const existingItem = await tx.wardrobeItem.findUnique({
        where: { id },
        include: { images: true },
      });

      const existingImages = existingItem?.images || [];

      // 3. Build WardrobeItemImage array (same logic as create)
      const images = imageUrls.slice(0, MAX_IMAGES).map((url, index) => {
        const existingImage = existingImages.find((img) => img.imageUrl === url);

        if (existingImage) {
          // Keep existing image with updated order/primary
          return {
            ...existingImage,
            displayOrder: index,
            isPrimary: index === 0,
          };
        } else {
          // New image - no id, will be created
          return {
            imageUrl: url,
            altText: data.name || existingItem?.name || null,
            isPrimary: index === 0,
            displayOrder: index,
            wardrobeItemId: id,
          };
        }
      });

      // 4. Upsert each image (update or create)
      // eslint-disable-next-line prefer-const
      let newImages = [];
      for (const [index, img] of images.entries()) {
        const isPrimary = index === 0;

        let image;
        if ("id" in img && img.id) {
          image = await tx.wardrobeItemImage.update({
            where: { id: img.id },
            data: {
              imageUrl: img.imageUrl,
              altText: data.name ?? undefined,
              isPrimary,
              displayOrder: index,
            },
          });
        } else {
          image = await tx.wardrobeItemImage.create({
            data: {
              wardrobeItemId: id,
              imageUrl: img.imageUrl,
              altText: data.name ?? img.altText ?? null,
              isPrimary,
              displayOrder: index,
            },
          });
        }
        newImages.push(image);
      }

      const incomingIds = newImages.map((img) => img.id);

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
}: GetUserWardrobeRepoParams & { userId: string }) => {
  "use cache";
  cacheTag(`wardrobe-user-items-${userId}-${sortBy}-${sortOrder}-${search}-${take}-${skip}`);
  cacheTag(`wardrobe-user-items-${userId}`);

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
  "use cache";
  cacheTag(`wardrobe-item-details-${itemId}-${userId}`);
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

export const deleteWardrobeItemRepo = async (itemId: string, userId: string) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Delete images first (foreign key constraint)
    await tx.wardrobeItemImage.deleteMany({
      where: { wardrobeItemId: itemId },
    });

    // 2. Delete the item
    const wardrobeItem = await tx.wardrobeItem.delete({
      where: { id: itemId, userId },
    });

    // 3. Return success
    return wardrobeItem;
  });
};

export const getWardrobeStatsRepo = async (userId: string) => {
  // 1. Get counts grouped by Category name (via join)
  const categoryCounts = await prisma.wardrobeItem.groupBy({
    by: ["categoryId"],
    where: {
      userId,
    },
    _count: {
      id: true,
    },
  });

  // 2. Fetch all categories once (to get their names)
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true, // e.g. "Tops", "Bottoms", "Shoes"
    },
  });

  // 3. Build lookup map: categoryId → name
  const categoryMap = new Map(categories.map((c) => [c.id, c.name]));

  // 4. Initialize result with 0 for all known categories
  const byCategory: Record<string, number> = {};
  categories.forEach((cat) => {
    byCategory[cat.name] = 0;
  });

  // 5. Fill actual counts
  let total = 0;
  for (const { categoryId, _count } of categoryCounts) {
    const name = categoryMap.get(categoryId);
    if (name && _count.id > 0) {
      byCategory[name] = _count.id;
      total += _count.id;
    }
  }

  return {
    total,
    byCategory,
  };
};

export const getWardrobeItemsFiltered = async (
  filters: IGeneratorFilters,
  userId: string,
): Promise<FilteredItemsDTO[]> => {
  const { style, weather } = filters;
  const items = await prisma.wardrobeItem.findMany({
    where: {
      userId,
      season: weather,
      category: {
        name: {
          contains: style,
          mode: "insensitive",
        },
      },
    },
    include: {
      category: true,
      images: true,
    },
  });

  return items;
};
