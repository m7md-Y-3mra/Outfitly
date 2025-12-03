import { ApiResponseError } from "@/types/response.type";
import CustomError from "./CustomError";
import z, { ZodError } from "zod";
import { HttpStatusError } from "@/types/status-code.type";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function handleError(actionFn: Function) {
  return async (...args: unknown[]): Promise<ApiResponseError> => {
    try {
      return await actionFn(...args);
    } catch (err: unknown) {
      if (err instanceof CustomError) {
        return {
          success: false,
          message: err.message,
          statusCode: err.statusCode,
        };
      }

      if (err instanceof ZodError) {
        const errors = z.flattenError(err, (issue) => issue.message).fieldErrors;
        return {
          success: false,
          message: "validation error",
          statusCode: HttpStatusError.BadRequest,
          errors: errors,
        };
      }

      console.error("Unexpected Server Action Error:", err);

      return {
        success: false,
        message: "Something went wrong.",
        statusCode: 500,
      };
    }
  };
}
