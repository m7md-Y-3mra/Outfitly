import { findAllCategoriesRepo } from "./category.repo";
import { cacheTag } from "next/cache";

export const findAllCategoriesService = async () => {
  "use cache";
  cacheTag("categories");

  return await findAllCategoriesRepo();
};
