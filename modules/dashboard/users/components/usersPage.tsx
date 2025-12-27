import { UsersTable } from "@/modules/dashboard/users/components/users/users-table";
import { getUsersForTablesPaginated } from "@/modules/dashboard/dashboard.service";

interface UsersPageProps {
  page?: number;
}

const UsersPage = async ({ page = 1 }: UsersPageProps) => {
  const { users, meta } = await getUsersForTablesPaginated(page, 10);

  return (
    <div className="pt-8 space-y-6">
      {/* Main Table Component (Includes Header) */}
      <UsersTable users={users} meta={meta} />
    </div>
  );
};

export default UsersPage;
