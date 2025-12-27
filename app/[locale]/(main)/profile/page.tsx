import type { Metadata } from "next";
import { ProfilePage } from "@/modules/profile";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Profile");
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}

export default function Profile() {
  return <ProfilePage />;
}
