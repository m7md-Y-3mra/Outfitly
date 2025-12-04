import { ITokenPayload, TVerifyTokenResult } from "@/@types";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export const generateToken = async (payload: ITokenPayload, expirationTime: string = "1d") => {
  const t = new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expirationTime);
  const token = await t.sign(encodedKey);

  return token;
};

export const verifyToken = async (token: string): Promise<TVerifyTokenResult> => {
  
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return { success: true, payload: payload as ITokenPayload };
  
};
