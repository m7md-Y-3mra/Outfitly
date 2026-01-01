import type { Metadata } from "next";
import MyWardrobe from "@/modules/wardrobe/my-wardrobe";
import { loadMyWardrobeSearchParams } from "@/modules/wardrobe/my-wardrobe/search-params";
import type { SearchParams } from "nuqs";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Wardrobe");
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}

type MyWardrobePageProps = {
  searchParams: Promise<SearchParams>;
};

const MyWardrobePage = async ({ searchParams }: MyWardrobePageProps) => {
  const searchParamsRes = await loadMyWardrobeSearchParams(searchParams);
  return <MyWardrobe searchParams={searchParamsRes} />;
};

export default MyWardrobePage;
