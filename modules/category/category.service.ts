import { authMiddleware } from "@/middlewares/auth.middleware";
import { findAllCategoriesRepo } from "./category.repo";
import { cacheTag } from "next/cache";

export const findAllCategoriesService = async () => {
  "use cache"
  cacheTag("categories");

  // await authMiddleware();
  return await findAllCategoriesRepo();
};
