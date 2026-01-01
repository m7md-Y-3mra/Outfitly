import { TCreateUser } from "./user.types";
import prisma from "@/lib/prisma";
import { createPaginationForPrisma, createPaginationMetaData } from "@/lib/database.util";

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
          TO_CHAR("createdAt", 'Month') as month,
          COUNT(*)::int as users
        FROM "User"
        WHERE "createdAt" >= ${new Date("2024-01-01")}
          AND "createdAt" < ${new Date("2025-01-01")}
        GROUP BY DATE_TRUNC('month', "createdAt"), TO_CHAR("createdAt", 'Month')
        ORDER BY DATE_TRUNC('month', "createdAt")
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

  async getUserWithOutfitsCountsPaginated(page: number = 1, limit: number = 10) {
    const pagination = createPaginationForPrisma({ page, limit });

    const [users, total] = await Promise.all([
      prisma.user.findMany({
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
        ...pagination,
      }),
      prisma.user.count(),
    ]);

    return {
      data: users,
      meta: createPaginationMetaData(limit, page, total),
    };
  }

  async update(id: string, data: { fullName?: string; email?: string; isActive?: boolean }) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async updateRole(id: string, role: "USER" | "ADMIN") {
    return await prisma.user.update({
      where: { id },
      data: { role },
    });
  }

  async delete(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  }
}
const userRepo = new UserRepo();
export default userRepo;
