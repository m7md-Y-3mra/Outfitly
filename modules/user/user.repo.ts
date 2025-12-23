import { TCreateUser } from "./user.types";
import prisma from "@/lib/prisma";

class UserRepo {
  async create(user: TCreateUser) {
    return await prisma.user.create({
      data: user,
    });
  }

  async findUserByEmail(email: string) {
    return await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async getCount() {
    return await prisma.user.count();
  }

  async getActivesCount() {
    return prisma.user.count({
      where: {
        isActive: true,
      },
    });
  }
}
const userRepo = new UserRepo();
export default userRepo;
