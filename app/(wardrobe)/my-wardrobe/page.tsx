import MyWardrobe from "@/modules/wardrobe/my-wardrobe";
import { loadMyWardrobeSearchParams } from "@/modules/wardrobe/my-wardrobe/search-params";
import type { SearchParams } from "nuqs";

type MyWardrobePageProps = {
  searchParams: Promise<SearchParams>;
};

const MyWardrobePage = async ({ searchParams }: MyWardrobePageProps) => {
  const searchParamsRes = await loadMyWardrobeSearchParams(searchParams);
  return <MyWardrobe searchParams={searchParamsRes} />;
};

export default MyWardrobePage;
