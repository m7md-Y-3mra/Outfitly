import { paginationQuerySchema } from "@/validation/query.pagination";
import * as z from 'zod';
export const outfitListQuerySchema = paginationQuerySchema.extend({
  order: z
    .enum(["asc", "desc"])
    .default("desc"),

  field: z
    .enum(["createdAt", "name"])
    .default("createdAt"),
});