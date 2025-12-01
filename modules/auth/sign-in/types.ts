import { User } from "@/app/generated/prisma/client";

export type TFormValues = Pick<User, "email" | "password">