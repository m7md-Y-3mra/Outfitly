import { Prisma } from "@/app/generated/prisma/client";

export type TOutfitDTO = Prisma.OutfitGetPayload<{
  include: {
    likedBy: {
      select: {
        id: true;
      };
    };
    occasion: {
      select: { name: true };
    };
    items: {
      select: {
        wardrobeItem: {
          select: { season: true };
        };
      };
    };
    user: {
      select: {
        id: true;
        fullName: true;
      };
    };
  };
}>;

export type TLikeOutfitDTO = Prisma.OutfitGetPayload<{
  select: {
    id: true;
    _count: {
      select: {
        likedBy: true;
      };
    };
  };
}>;

export type CreateOutfitDTO = {
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  isAiGenerated?: boolean;
  visibility?: string;
  user: Prisma.UserCreateNestedOneWithoutOutfitsInput;
  occasion?: Prisma.OccasionCreateNestedOneWithoutOutfitsInput;
  items?: Prisma.OutfitItemCreateNestedManyWithoutOutfitInput;
};

export type AllOccasions = Prisma.OccasionGetPayload<{
  select: {
    id: true;
    name: true;
    description: true;
  };
}>;
