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

  async getUsersByMonth() {
    return await userRepo.getMonthlyUsers();
  }

  async getUsersWithOutfitsService() {
    return await userRepo.getUserWithOutfitsCounts();
  }

  async getUsersWithOutfitsPaginated(page: number = 1, limit: number = 10) {
    return await userRepo.getUserWithOutfitsCountsPaginated(page, limit);
  }

  async updateUser(id: string, data: { fullName?: string; email?: string; isActive?: boolean }) {
    try {
      const updatedUser = await userRepo.update(id, data);
      return removeFields(updatedUser, ["password"]);
    } catch (err: unknown) {
      console.error("UserService.updateUser error:", err);
      throw err;
    }
  }

  async updateUserRole(id: string, role: "USER" | "ADMIN") {
    try {
      const updatedUser = await userRepo.updateRole(id, role);
      return removeFields(updatedUser, ["password"]);
    } catch (err: unknown) {
      console.error("UserService.updateUserRole error:", err);
      throw err;
    }
  }

  async deleteUser(id: string) {
    try {
      await userRepo.delete(id);
      return { success: true };
    } catch (err: unknown) {
      console.error("UserService.deleteUser error:", err);
      throw err;
    }
  }
}

const userService = new UserService();
export default userService;
