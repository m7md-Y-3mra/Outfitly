import { ZodType } from "zod";

export const zodValidation = <T>(schema: ZodType<T>, payload: T) => {
  const result = schema.safeParse(payload);

  if (!result.success) {
    throw result.error;
  }

  return result.data;
};
