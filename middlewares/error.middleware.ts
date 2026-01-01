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
import Groq from "groq-sdk";

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

      if (err instanceof Error && err.message.includes("GROQ_API_KEY")) {
        console.log("hhhhhhh");
        return {
          success: false,
          statusCode: 500,
          message: "AI service configuration error. Please contact support.",
        };
      }
      if (err instanceof Groq.APIConnectionError) {
        return {
          success: false,
          statusCode: 503,
          message: "Unable to connect to AI service. Please check your internet connection.",
        };
      }
      if (err instanceof Groq.APIError) {
        const status = err.status as number | undefined;
        const msg = String(err.message ?? "");

        // 503: model overloaded / unavailable
        if (status === 503) {
          return {
            success: false,
            statusCode: 503,
            message: "AI is overloaded right now. Please try again in a few seconds.",
          };
        }

        // 429: quota / rate limit
        if (status === 429) {
          return {
            success: false,
            statusCode: 429,
            message: "AI rate limit/quota reached. Please try again later.",
          };
        }

        // 400: bad request (prompt too large / invalid schema / invalid params)
        if (status === 400) {
          return {
            success: false,
            statusCode: 400,
            message: "AI request is invalid. Please adjust your input and try again.",
          };
        }

        // 401/403: missing/invalid key, permissions
        if (status === 401 || status === 403) {
          return {
            success: false,
            statusCode: 500, // hide provider auth issues from client
            message: "AI service is not configured correctly (API key/permissions).",
          };
        }

        // Fallback for any other Groq API error
        return {
          success: false,
          statusCode: 500,
          message: msg || "AI service error.",
        };
      }
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
