"use server";
import { errorMiddleware } from "@/middlewares/error.middleware";
import { findAllCategoriesService } from "./category.service";

export const findAllCategoriesAction = errorMiddleware(findAllCategoriesService);
