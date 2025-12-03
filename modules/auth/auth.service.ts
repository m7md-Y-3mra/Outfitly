import { TCreateUser } from "../user/user.types";
import userService from "../user/user.service";
import { ITokenPayload, TSignUpResult } from "@/@types";
import { hashPassword, verifyPassword } from "@/lib/argon2.util";
import { generateToken, verifyToken } from "@/lib/jwt.util";
import { removeFields } from "@/shared/utils/object.utils";

class AuthService {
  async signUp(data: TCreateUser): Promise<TSignUpResult> {
    try {
      const hashedPassword = await hashPassword(data.password);

      const dataWithHashedPass = {
        ...data,
        password: hashedPassword,
      };

      const createdUser = await userService.create(dataWithHashedPass);

      return { success: true, user: createdUser };
    } catch (err: unknown) {
      //TODO: handling the errors in unified way
      console.error(err);
      return { success: false, error: "Internal server error" };
    }
  }

  async signIn(data: Pick<TCreateUser, "email" | "password">) {
    try {
      const normalizedEmail = data.email.toLowerCase().trim();
      const user = await userService.findUserByEmail(normalizedEmail);
      const isPasswordValid = await verifyPassword(data.password, user.password);

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
      return { success: true, token, data: userForClient };
    } catch (err: unknown) {
      //TODO: handling the errors in unified way
      console.error(err);
      return { success: false, error: "Invalid credentials" };
    }
  }

  async revalidate(token: string) {
    try {
      const result = await verifyToken(token);

      if (!result.success) {
        return {
          success: false,
          error:
            result.error === "expired"
              ? "Session expired. Please sign in again."
              : "Invalid session. Please sign in again.",
        };
      }

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
        success: true,
        token: newToken,
        data: userForClient,
      };
    } catch (err: unknown) {
      // TODO: handle errors
      console.error("Revalidate error:", err);
      throw err;
    }
  }
}

const authService = new AuthService();
export default authService;
