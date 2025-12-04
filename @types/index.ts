import { User } from "@/app/generated/prisma/client";
import { JwtPayload } from "jsonwebtoken";
export interface IStyle {
  input: string;
  label: string;
}

export interface ITokenPayload extends JwtPayload {
  sub: User["id"];
  fullName: User["fullName"];
  email: User["email"];
}
export type TVerifyTokenResult = { success: true; payload: ITokenPayload }

export type TSignUpResult = { data: Omit<User, "password"> }
export type TSignInResult = TSignUpResult & {
  token: string;
}

export type TSuccessConfig = {
  statusCode?: 200 | 201 | 204;
  message?: string;
};
