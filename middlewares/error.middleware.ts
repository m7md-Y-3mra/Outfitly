import { ApiResponseError, ApiResponseSuccess } from "@/@types/response.type";
import CustomError from "../utils/CustomError";
import z, { ZodError } from "zod";
import { HttpStatusError } from "@/@types/status-code.type";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/client";
import { prismaKnownErrorMessage } from "../utils/prisma.utils";
import { TSuccessConfig } from "@/@types";
import { errors as JoseErrors } from "jose";

export function errorMiddleware<Args extends unknown[], Return>(
  actionFn: (...args: Args) => Promise<Return>,
  config?: TSuccessConfig,
) {
  return async (...args: Args): Promise<ApiResponseSuccess<Return> | ApiResponseError> => {
    try {
      const data = await actionFn(...args);

      return {
        success: true,
        statusCode: config?.statusCode ?? 200,
        message: config?.message ?? "Operation successful",
        data,
      } as ApiResponseSuccess<Return>;
    } catch (err: unknown) {
      // ---------------------------
      // 🔥 Prisma Error Handling
      // ---------------------------
      console.log(err);
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
      // 🔥 JWT / Token errors (jose)
      // ---------------------------

      if (err instanceof JoseErrors.JWTExpired) {
        return {
          success: false,
          statusCode: HttpStatusError.Unauthorized,
          message: "Session expired. Please sign in again.",
        };
      }

      if (
        err instanceof JoseErrors.JWTInvalid ||
        err instanceof JoseErrors.JOSEError || // base class for many jose errors
        err instanceof JoseErrors.JWTClaimValidationFailed
      ) {
        return {
          success: false,
          statusCode: HttpStatusError.Unauthorized,
          message: "Invalid session. Please sign in again.",
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
