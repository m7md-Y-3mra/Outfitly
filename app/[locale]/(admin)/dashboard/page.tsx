import type { Metadata } from "next";
import HomePage from "@/modules/dashboard/home/components/homePage";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Outfitly admin dashboard. Manage users, outfits, and settings.",
};

const DashboardPage = () => {
  return <HomePage />;
};

export default DashboardPage;
