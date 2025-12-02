import { removeFields } from "@/shared/utils/object.utils";
import userRepo from "./user.repo";
import { TCreateUser } from "./user.types";
import { createUserValidationSchema } from "./validation/createUser.validation";

class UserService {
  async create(user: TCreateUser) {
    try {
      const parsedData = createUserValidationSchema.parse(user);
      const createdUser = await userRepo.create(parsedData);
      const userForClientSide = removeFields(createdUser, ["password"]);
      return userForClientSide;
    } catch (err: unknown) {
      console.error(err);
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await userRepo.findUserByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }
      const userForClientSide = removeFields(user, ["password"]);
      return userForClientSide;
    } catch (err: unknown) {
      console.error(err);
    }
  }
}
const userService = new UserService();
export default userService;
