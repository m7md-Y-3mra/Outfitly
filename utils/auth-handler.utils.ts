import CustomError from "./CustomError";
import { HttpStatusError } from "@/@types/status-code.type";
import { User } from "@/app/generated/prisma/client";
import { getUserFromSession } from "@/modules/auth/auth.service";
import userRepo from "@/modules/user/user.repo";

export function authHandler<Args extends unknown[], Return>(
  actionFn: (user?: User, ...args: Args) => Promise<Return>,
) {
  return async (...args: Args): Promise<Return> => {
    const payload = await getUserFromSession();

    const userData = await userRepo.findById(payload.sub);

    if (!userData) {
      throw new CustomError({
        message: "not authenticated",
        statusCode: HttpStatusError.Unauthorized,
      });
    }

    return actionFn(userData, ...args);
  };
}
