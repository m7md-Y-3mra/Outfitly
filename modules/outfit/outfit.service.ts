import { IPaginationQuery } from "@/@types/database.type";
import { Outfit } from "@/app/generated/prisma/client";
import { SortOrder } from "@/app/generated/prisma/internal/prismaNamespace";
import { findAll } from "./outfit.repo";

export const getAllOutfitsPaginated = (
  query: IPaginationQuery,
  order: SortOrder = "desc",
  field: keyof Outfit = "createdAt",
) => {
  return findAll(query, order, field);
};
