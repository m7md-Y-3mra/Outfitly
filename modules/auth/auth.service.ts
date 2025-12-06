import { TCreateUser } from "../user/user.types";
import userService from "../user/user.service";
import { ITokenPayload, TSignInResult, TSignUpResult } from "@/@types";
import { hashPassword, verifyPassword } from "@/lib/argon2.util";
import { generateToken, verifyToken } from "@/lib/jwt.util";
import { removeFields } from "@/utils/object.utils";
import { cookies } from "next/headers";
import CustomError from "@/utils/CustomError";

export async function signUp(data: TCreateUser): Promise<TSignUpResult> {
  const hashedPassword = await hashPassword(data.password);

  const dataWithHashedPass: TCreateUser = {
    ...data,
    password: hashedPassword,
  };

  const createdUser = await userService.create(dataWithHashedPass);

  return { user: createdUser };
}

export async function signIn(
  creds: Pick<TCreateUser, "email" | "password">,
): Promise<TSignInResult> {
  const normalizedEmail = creds.email.toLowerCase().trim();

  const user = await userService.findUserByEmail(normalizedEmail);

  const isPasswordValid = await verifyPassword(creds.password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const tokenPayload: ITokenPayload = {
    sub: user.id,
    email: user.email,
    fullName: user.fullName,
  };

  const token = await generateToken(tokenPayload);
  const userForClient = removeFields(user, ["password"]);
  (await cookies()).set("user-token", token);
  return { token, user: userForClient };
}

export async function revalidateUser(token: string): Promise<TSignInResult> {
  const result = await verifyToken(token);

  const payload = result.payload;

  const user = await userService.findById(payload.sub);

  const newTokenPayload: ITokenPayload = {
    sub: user.id,
    email: user.email,
    fullName: user.fullName,
  };

  const newToken = await generateToken(newTokenPayload);
  const userForClient = removeFields(user, ["password"]);

  return {
    token: newToken,
    user: userForClient,
  };

}

export const getAuthedUserAndRefresh = async() => {
      const cookiesStore = await cookies();
      const token =  cookiesStore.get('user-token')?.value;

      if(!token) {
          throw new CustomError({message: 'No token found', statusCode: 401});
      }

      const verifiedUser = await revalidateUser(token);
      
      cookiesStore.set('user-token', verifiedUser.token); 
      
      return verifiedUser;
  }
