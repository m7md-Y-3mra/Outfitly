import prisma from "@/lib/prisma";
import type { FindAllBrandsResponse } from "./brand.types";

export const findAllBrandsService = async (): Promise<FindAllBrandsResponse> => {
  'use cache'
  const brands = await prisma.brand.findMany({
    select: {
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return brands.map((brand) => brand.name);
};
