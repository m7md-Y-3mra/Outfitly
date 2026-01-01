import { User } from "@/app/generated/prisma/client";
export type TAuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";
export interface IAuthState {
  user: Omit<User, "password"> | null;
  authStatus: TAuthStatus;
  setUser: (user: Omit<User, "password"> | null) => void;
  setStatus: (status: TAuthStatus) => void;
  applySignedIn: (user: Omit<User, "password">) => void;
  applySignedOut: () => void;
}
