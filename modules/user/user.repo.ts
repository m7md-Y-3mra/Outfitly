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

  async getMonthlyUsers() {
    const monthlyUsers = await prisma.$queryRaw<Array<{ month: string; users: bigint }>>`
        SELECT 
          TO_CHAR(created_at, 'Month') as month,
          COUNT(*)::int as users
        FROM users
        WHERE created_at >= ${new Date("2024-01-01")}
          AND created_at < ${new Date("2025-01-01")}
        GROUP BY DATE_TRUNC('month', created_at), TO_CHAR(created_at, 'Month')
        ORDER BY DATE_TRUNC('month', created_at)
      `;
    return monthlyUsers;
  }

  async getUserWithOutfitsCounts() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        isActive: true,
        createdAt: true,
        _count: {
          select: { outfits: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return users;
  }
}
const userRepo = new UserRepo();
export default userRepo;
