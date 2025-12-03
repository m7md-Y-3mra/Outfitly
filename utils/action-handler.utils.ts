import { ApiResponseError } from "@/types/response.type";
import CustomError from "./CustomError";
import z, { ZodError } from "zod";
import { HttpStatusError } from "@/types/status-code.type";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/client";
import { prismaKnownErrorMessage } from "./prisma.utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function actionHandler<Args extends unknown[], Return>(
  actionFn: (...args: Args) => Promise<Return>,
) {
  return async (...args: Args): Promise<Return | ApiResponseError> => {
    try {
      return await actionFn(...args);
    } catch (err: unknown) {
      // ---------------------------
      // 🔥 Prisma Error Handling
      // ---------------------------

      if (err instanceof PrismaClientKnownRequestError) {
        return {
          success: false,
          statusCode: 400,
          message: prismaKnownErrorMessage(err),
        };
      }

      if (err instanceof PrismaClientValidationError) {
        return {
          success: false,
          statusCode: 400,
          message: "Validation error: invalid data provided.",
        };
      }

      if (err instanceof PrismaClientRustPanicError) {
        return {
          success: false,
          statusCode: 500,
          message: "Database experienced an unexpected panic.",
        };
      }

      if (err instanceof PrismaClientInitializationError) {
        return {
          success: false,
          statusCode: 500,
          message: "Failed to initialize database connection.",
        };
      }

      if (err instanceof PrismaClientUnknownRequestError) {
        return {
          success: false,
          statusCode: 500,
          message: "Unknown database error occurred.",
        };
      }

      // ---------------------------
      // 🔥 Zod
      // ---------------------------

      if (err instanceof ZodError) {
        const errors = z.flattenError(err, (issue) => issue.message).fieldErrors;
        return {
          success: false,
          statusCode: HttpStatusError.BadRequest,
          message: "Validation error",
          errors,
        };
      }

      // ---------------------------
      // 🔥 CustomError
      // ---------------------------

      if (err instanceof CustomError) {
        return {
          success: false,
          statusCode: err.statusCode,
          message: err.message,
        };
      }

      // ---------------------------
      // 🔥 Unknown error fallback
      // ---------------------------

      console.error("Unexpected Server Action Error:", err);

      return {
        success: false,
        message: "Something went wrong.",
        statusCode: 500,
      };
    }
  };
}
