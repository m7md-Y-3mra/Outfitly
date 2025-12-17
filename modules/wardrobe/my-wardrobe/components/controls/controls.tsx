"use client";
import { motion } from "framer-motion";
import Search from "./search";
import { ChevronDown, Grid3x3, List } from "lucide-react";
import { createArrayFromDiscriminatedUnion } from "@/utils/types.utils";
import { WardrobeSortBy } from "@/modules/wardrobe/types/dto.types";
import { useQueryState } from "nuqs";
import { SortOrder } from "@/app/generated/prisma/internal/prismaNamespace";
import { useViewMode } from "../../provider/viewMode.provider";

const Controls = () => {
  const { viewMode, toggleMode } = useViewMode();
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "addedAt",
    shallow: false,
  });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "desc",
    shallow: false,
  });
  const onViewModeChange = () => {
    toggleMode();
  };

  const onSortByChange = (value: WardrobeSortBy) => {
    setSortBy(value);
  };

  const onSortOrderChange = (value: SortOrder) => {
    setSortOrder(value);
  };

  return (
    <div>
      {/* Search and Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-white dark:bg-[#2A2A30] p-4 rounded-2xl shadow-md"
      >
        {/* Search */}
        <Search />

        {/* Controls */}
        <div className="flex gap-3 items-center">
          {/* View Mode Toggle */}
          <div className="flex gap-2 bg-[#FAF1ED] dark:bg-[#1C1C20] p-1 rounded-lg">
            <button
              onClick={() => onViewModeChange()}
              className={`
                p-2 rounded-lg transition-all duration-300
                ${
                  viewMode === "grid"
                    ? "bg-linear-to-r from-[#671425] to-[#8B1D35] text-white shadow-md"
                    : "text-[#4C1420] dark:text-white/60 hover:text-[#671425] dark:hover:text-white"
                }
              `}
              aria-label="Grid view"
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewModeChange()}
              className={`
                p-2 rounded-lg transition-all duration-300
                ${
                  viewMode === "list"
                    ? "bg-linear-to-r from-[#671425] to-[#8B1D35] text-white shadow-md"
                    : "text-[#4C1420] dark:text-white/60 hover:text-[#671425] dark:hover:text-white"
                }
              `}
              aria-label="List view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* SortBy Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value as WardrobeSortBy)}
              className="appearance-none pl-4 pr-10 py-3 rounded-xl bg-[#FAF1ED] dark:bg-[#1C1C20] border border-[#F2E8E3] dark:border-[#35353D] text-[#4C1420] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#671425] dark:focus:ring-[#8B1D35] transition-all duration-300 cursor-pointer"
            >
              {createArrayFromDiscriminatedUnion<WardrobeSortBy>("addedAt", "name").map(
                (sortBy) => (
                  <option key={sortBy}>{sortBy}</option>
                ),
              )}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4C1420]/60 dark:text-white/60 pointer-events-none" />
          </div>

          {/* SortOrder Dropdown*/}
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
              className="appearance-none pl-4 pr-10 py-3 rounded-xl bg-[#FAF1ED] dark:bg-[#1C1C20] border border-[#F2E8E3] dark:border-[#35353D] text-[#4C1420] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#671425] dark:focus:ring-[#8B1D35] transition-all duration-300 cursor-pointer"
            >
              {createArrayFromDiscriminatedUnion<SortOrder>("asc", "desc").map((sortOrder) => (
                <option key={sortOrder}>{sortOrder}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4C1420]/60 dark:text-white/60 pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Controls;
