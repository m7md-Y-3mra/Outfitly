import { createLoader, parseAsString, parseAsStringEnum, parseAsInteger } from "nuqs/server";
import { WardrobeSortBy } from "../types/dto.types";
import { SortOrder } from "@/app/generated/prisma/internal/prismaNamespace";
import { createArrayFromDiscriminatedUnion } from "@/utils/types.utils";

export const myWardrobeSearchParams = {
  search: parseAsString.withDefault(""),
  categoryId: parseAsString.withDefault(""),
  sortBy: parseAsStringEnum<WardrobeSortBy>(
    createArrayFromDiscriminatedUnion<WardrobeSortBy>("addedAt", "name"),
  ).withDefault("addedAt"),
  sortOrder: parseAsStringEnum<SortOrder>(
    createArrayFromDiscriminatedUnion<SortOrder>("asc", "desc"),
  ).withDefault("asc"),
  page: parseAsInteger.withDefault(1),
};

export const loadMyWardrobeSearchParams = createLoader(myWardrobeSearchParams);
