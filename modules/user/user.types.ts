import { User } from "@/app/generated/prisma/client";

export type TCreateUser = Pick<User, "fullName" | "email" | "password">;
