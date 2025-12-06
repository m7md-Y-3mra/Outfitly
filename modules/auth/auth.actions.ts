"use server";
import { actionHandler } from "@/utils/action-handler.utils";
import { getAuthedUserAndRefresh, revalidateUser, signIn, signUp } from "./auth.service";

export const signInAction = actionHandler(signIn, {
  statusCode: 200,
  message: "Sign in successful!",
});

export const signUpAction = actionHandler(signUp, {
  statusCode: 201,
  message: "Sign up successful!",
});

export const revalidateUserAction = actionHandler(revalidateUser, {
  statusCode: 200,
});

export const getUserAndRefreshAction = actionHandler(getAuthedUserAndRefresh, {
  statusCode: 200,
  message: "User and refresh token retrieved successfully!",
})
