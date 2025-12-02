import { userValidationSchema } from "@/validation/user.validation";
import * as z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
const signUpValidationSchema = userValidationSchema
  .pick({
    fullName: true,
    email: true,
    password: true,
  })
  .extend({
    confirmPassword: z.string().min(1, "Confirm password is required"),
    terms: z.boolean().refine((value) => value === true, "You must accept the terms"),
  })
  .refine((data) => {
    return (
      data.confirmPassword === data.password,
      {
        message: "Passwords must match",
        path: ["confirmPassword"],
      }
    );
  });

export const formikSignUpSchema = toFormikValidationSchema(signUpValidationSchema);
