"use client";
import { motion } from "framer-motion";
import Search from "./search";
import { Grid3x3, List } from "lucide-react";
import { useState } from "react";

const Controls = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const onViewModeChange = (value: "grid" | "list") => {
    setViewMode(value);
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
              onClick={() => onViewModeChange("grid")}
              className={`
                p-2 rounded-lg transition-all duration-300
                ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-[#671425] to-[#8B1D35] text-white shadow-md"
                    : "text-[#4C1420] dark:text-white/60 hover:text-[#671425] dark:hover:text-white"
                }
              `}
              aria-label="Grid view"
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`
                p-2 rounded-lg transition-all duration-300
                ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-[#671425] to-[#8B1D35] text-white shadow-md"
                    : "text-[#4C1420] dark:text-white/60 hover:text-[#671425] dark:hover:text-white"
                }
              `}
              aria-label="List view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Sort Dropdown */}
          {/* <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value as SortBy)}
              className="appearance-none pl-4 pr-10 py-3 rounded-xl bg-[#FAF1ED] dark:bg-[#1C1C20] border border-[#F2E8E3] dark:border-[#35353D] text-[#4C1420] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#671425] dark:focus:ring-[#8B1D35] transition-all duration-300 cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name">Name</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4C1420]/60 dark:text-white/60 pointer-events-none" />
          </div> */}
        </div>
      </motion.div>
    </div>
  );
};

export default Controls;
