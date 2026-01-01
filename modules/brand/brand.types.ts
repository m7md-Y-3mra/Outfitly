import { Brand } from "@/app/generated/prisma/client";

export type BrandName = Pick<Brand, "name">;

export type FindAllBrandsResponse = string[];
