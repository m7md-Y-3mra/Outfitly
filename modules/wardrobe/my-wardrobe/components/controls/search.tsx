"use client";
import { Search as Controls } from "lucide-react";
import { useQueryState, debounce } from "nuqs";
import { useTranslations } from "next-intl";

const Search = () => {
  const t = useTranslations("Wardrobe");
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    shallow: false,
  });

  const onSearchChange = (value: string) => {
    setSearch(value, {
      // Send immediate update if resetting, otherwise debounce at 500ms
      limitUrlUpdates: value === "" ? undefined : debounce(500),
    });
  };

  return (
    <div className="relative flex-1 max-w-md">
      <Controls className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4C1420]/40 dark:text-white/40" />
      <input
        type="text"
        placeholder={t("searchPlaceholder")}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#FAF1ED] dark:bg-[#1C1C20] border border-[#F2E8E3] dark:border-[#35353D] text-[#4C1420] dark:text-white placeholder-[#4C1420]/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#671425] dark:focus:ring-[#8B1D35] transition-all duration-300"
      />
    </div>
  );
};

export default Search;
