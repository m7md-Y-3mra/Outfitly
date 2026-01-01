import type { Metadata } from "next";
import ExplorePage from "@/modules/explore";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Explore");
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}

const Explore = () => {
  return <ExplorePage />;
};

export default Explore;
