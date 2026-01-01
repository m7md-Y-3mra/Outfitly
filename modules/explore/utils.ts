import { User } from "@/app/generated/prisma/client";

export const isUserLike = (ids: { id: User["id"] }[], userId: User["id"]) => {
  return ids.some((id) => id.id === userId);
};
