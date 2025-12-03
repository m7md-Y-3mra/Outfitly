import { ApiResponseError } from "@/types/response.type";
import CustomError from "./CustomError";
import z, { ZodError } from "zod"
import { HttpStatusError } from "@/types/status-code.type";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function actionHandler<T extends (...args: any[]) => Promise<any>>(actionFn: T) {
  return async (
    ...args: Parameters<T>
  ): Promise<Awaited<ReturnType<T>> | ApiResponseError> => {
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
        const errors = z.flattenError(err, issue => issue.message).fieldErrors;
        return {
          success: false,
          message: "validation error",
          statusCode: HttpStatusError.BadRequest,
          errors,
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
