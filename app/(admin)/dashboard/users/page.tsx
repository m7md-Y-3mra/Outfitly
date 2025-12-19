import type { Metadata } from "next";
import UsersPage from "@/modules/dashboard/users/components/usersPage";

export const metadata: Metadata = {
  title: "Users Management",
  description: "Manage user accounts on Outfitly.",
};

const Users = () => {
  return <UsersPage />;
};

export default Users;
