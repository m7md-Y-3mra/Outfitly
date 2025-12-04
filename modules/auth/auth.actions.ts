"use server";
import { actionHandler } from "@/utils/action-handler.utils";
import { signIn, signUp } from "./auth.service";

export const signInAction = actionHandler(signIn, {
    statusCode: 200,
    message: "Sign in successful!",
})

export const signUpAction = actionHandler(signUp, {
  statusCode: 201,
  message: "Sign up successful!",
});

