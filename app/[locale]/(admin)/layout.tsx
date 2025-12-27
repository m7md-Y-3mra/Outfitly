import { redirect } from "next/navigation";
import { getUserFromSession } from "@/modules/auth/auth.service";
import userRepo from "@/modules/user/user.repo";
import AdminLayoutClient from "@/components/admin/admin-layout-client";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const sessionUser = await getUserFromSession();

  if (!sessionUser) {
    redirect("/login");
  }

  try {
    const user = await userRepo.findById(sessionUser.sub);

    if (user.role !== "ADMIN") {
      redirect("/");
    }
  } catch {
    redirect("/login");
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
