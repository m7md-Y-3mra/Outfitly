import { toFormikValidationSchema } from "zod-formik-adapter";
import { CreateWardrobeItemDTOSchema } from "../../wardrobe.schema";
import * as z from "zod";

// Transform schema to use categoryName instead of categoryId for the form
// Brand is already a string in the schema
// purchasedDate accepts both string (from input) and Date, then coerces to Date
const wardrobeFormValidationSchema = CreateWardrobeItemDTOSchema.omit({
  categoryId: true,
  purchasedDate: true,
}).extend({
  categoryName: z.string().min(1, "Category is required"),
  purchasedDate: z.coerce.date(),
});

export const formikWardrobeFormSchema = toFormikValidationSchema(wardrobeFormValidationSchema);
