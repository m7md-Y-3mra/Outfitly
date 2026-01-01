import { userValidationSchema } from "@/validation/user.validation";

export const createUserValidationSchema = userValidationSchema.pick({
  fullName: true,
  email: true,
  password: true,
});
