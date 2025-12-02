import { userValidationSchema } from "@/validation/user.validation";
import { toFormikValidationSchema } from "zod-formik-adapter";

const signInValidationScehma = userValidationSchema.pick({
  email: true,
  password: true,
});

export const formikSignInSchema = toFormikValidationSchema(signInValidationScehma);
