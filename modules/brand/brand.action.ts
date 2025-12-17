"use server";

import { errorMiddleware } from "@/middlewares/error.middleware";
import { findAllBrandsService } from "./brand.service";

export const findAllBrandsAction = errorMiddleware(findAllBrandsService);
