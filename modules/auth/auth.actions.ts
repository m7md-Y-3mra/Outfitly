"use server";
import { errorMiddleware } from "@/middlewares/error.middleware";
import {
  getAuthedUserAndRefresh,
  getUserFromSession,
  logOut,
  revalidateUser,
  signIn,
  signUp,
} from "./auth.service";

export const signInAction = errorMiddleware(signIn, {
  statusCode: 200,
  message: "Sign in successful!",
});

export const signUpAction = errorMiddleware(signUp, {
  statusCode: 201,
  message: "Sign up successful!",
});

export const revalidateUserAction = errorMiddleware(revalidateUser, {
  statusCode: 200,
});

export const getUserAndRefreshAction = errorMiddleware(getAuthedUserAndRefresh, {
  statusCode: 200,
  message: "User and refresh token retrieved successfully!",
});

export const getUserFromSessionAction = errorMiddleware(getUserFromSession, {
  statusCode: 200,
  message: "User session retrieved successfully!",
});

export const logOutAction = errorMiddleware(logOut, {
  statusCode: 200,
  message: "logged out successfully!",
});
