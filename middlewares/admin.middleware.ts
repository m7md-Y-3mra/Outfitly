import CustomError from "../utils/CustomError";
import { HttpStatusError } from "@/@types/status-code.type";
import { getUserFromSession } from "@/modules/auth/auth.service";
import userRepo from "@/modules/user/user.repo";

export async function adminMiddleware() {
  const sessionUser = await getUserFromSession();

  if (!sessionUser) {
    throw new CustomError({
      message: "not authenticated",
      statusCode: HttpStatusError.Unauthorized,
    });
  }

  const user = await userRepo.findById(sessionUser.sub);

  if (!user) {
    throw new CustomError({
      message: "not authenticated",
      statusCode: HttpStatusError.Unauthorized,
    });
  }

  if (user.role !== "ADMIN") {
    throw new CustomError({
      message: "access denied - admin only",
      statusCode: HttpStatusError.Forbidden,
    });
  }

  return user;
}
