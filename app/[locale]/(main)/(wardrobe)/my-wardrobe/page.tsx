import type { Metadata } from "next";
import MyWardrobe from "@/modules/wardrobe/my-wardrobe";
import { loadMyWardrobeSearchParams } from "@/modules/wardrobe/my-wardrobe/search-params";
import type { SearchParams } from "nuqs";

export const metadata: Metadata = {
  title: "My Wardrobe",
  description:
    "Manage your wardrobe items. Add, edit, and organize your clothing collection all in one place.",
};

type MyWardrobePageProps = {
  searchParams: Promise<SearchParams>;
};

const MyWardrobePage = async ({ searchParams }: MyWardrobePageProps) => {
  const searchParamsRes = await loadMyWardrobeSearchParams(searchParams);
  return <MyWardrobe searchParams={searchParamsRes} />;
};

export default MyWardrobePage;
