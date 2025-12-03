import prisma from "@/lib/prisma";

export const findCategoryById = async (id: string) => {
  return await prisma.category.findUniqueOrThrow({
    where: {
      id,
    },
  });
};
