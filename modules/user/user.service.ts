import { removeFields } from "@/utils/object.utils";
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
      console.error("UserService.create error:", err);
      throw err;
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await userRepo.findUserByEmail(email);
      return user;
    } catch (err: unknown) {
      console.error("UserService.findUserByEmail error:", err);
      throw err;
    }
  }

  async findById(id: string) {
    try {
      const user = await userRepo.findById(id);
      return user;
    } catch (err: unknown) {
      console.error("UserService.findById error:", err);
      throw err;
    }
  }

  async getUsersCount() {
    return await userRepo.getCount();
  }

  async getActiveUsersCount() {
    return await userRepo.getActivesCount();
  }
}

const userService = new UserService();
export default userService;
