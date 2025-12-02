import { TFormValues } from "./signUp.types";

export const INITIAL_VALUES: TFormValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  terms: false,
} as const;
