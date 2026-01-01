import { IMetaPagination, IPaginationQuery } from "@/@types/database.type";

export const createPaginationForPrisma = (query: IPaginationQuery) => {
  const page = Number(query.page ?? 1);
  const limit = Number(query.limit ?? 10);
  const skip = (page - 1) * limit;
  return {
    skip,
    take: limit,
  };
};

export const createPaginationMetaData = (
  limit: number,
  page: number,
  total: number,
): IMetaPagination => {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};
