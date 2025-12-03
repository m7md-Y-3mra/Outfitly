"use server";

import authService from "@/modules/auth/auth.service";
import { TCreateUser } from "@/modules/user/user.types";

export const signInAction = async (data: Pick<TCreateUser, "email" | "password">) => {
  const { token, user } = await authService.signIn(data);

  return {
    success: true as const,
    token,
    data: user,
  };
};

export const signUpAction = async (data: TCreateUser) => {
  const user = await authService.signUp(data);

  return {
    success: true as const,
    data: user,
  };
};
