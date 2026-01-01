import prisma from "@/lib/prisma";

export const findCategoryById = async (id: string) => {
  return await prisma.category.findUniqueOrThrow({
    where: {
      id,
    },
  });
};

export const findAllCategoriesRepo = async () => {
  return await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
};
