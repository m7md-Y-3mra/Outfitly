import type { Metadata } from "next";
import UsersPage from "@/modules/dashboard/users/components/usersPage";

export const metadata: Metadata = {
  title: "Users Management",
  description: "Manage user accounts on Outfitly.",
};

interface UsersPageProps {
  searchParams: Promise<{ page?: string }>;
}

const Users = async ({ searchParams }: UsersPageProps) => {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  return <UsersPage page={page} />;
};

export default Users;
