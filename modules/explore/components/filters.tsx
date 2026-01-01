"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { ChevronDown, Filter } from "lucide-react";
import { useTheme } from "next-themes";
import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";

interface IProps {
  styleFilter: string;
  seasonFilter: string;
  setStyleFilter: Dispatch<SetStateAction<string>>;
  setSeasonFilter: Dispatch<SetStateAction<string>>;
}

const Filters = ({ styleFilter, seasonFilter, setStyleFilter, setSeasonFilter }: IProps) => {
  const { theme } = useTheme();
  const t = useTranslations("Explore.filters");
  const tCommon = useTranslations("Common");

  const STYLES = [t("allStyles"), t("casual"), t("elegant"), t("street"), t("boho")];

  const SEASONS = [t("allSeasons"), t("spring"), t("summer"), t("autumn"), t("winter")];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mb-12"
    >
      <div
        className="p-6 rounded-2xl border-2 shadow-lg transition-all duration-300"
        style={{
          backgroundColor:
            theme === "dark" ? "var(--outfitly-bg-secondary)" : "var(--outfitly-bg-white)",
          borderColor:
            theme === "dark" ? "var(--outfitly-primary)" : "var(--outfitly-bg-secondary)",
        }}
      >
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
              style={{ backgroundColor: "var(--outfitly-primary)" }}
            >
              <Filter className="w-5 h-5" style={{ color: "var(--outfitly-text-light)" }} />
            </div>
            <span
              className="transition-colors duration-300"
              style={{
                color: theme === "dark" ? "var(--outfitly-text-light)" : "var(--outfitly-primary)",
              }}
            >
              {tCommon("filterBy")}
            </span>
          </div>

          {/* Style Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="transition-all duration-300 border-2 hover:scale-105"
                style={{
                  backgroundColor:
                    theme === "dark"
                      ? "var(--outfitly-bg-primary)"
                      : "var(--outfitly-bg-secondary)",
                  borderColor: "var(--outfitly-primary)",
                  color:
                    theme === "dark" ? "var(--outfitly-text-light)" : "var(--outfitly-primary)",
                }}
              >
                {styleFilter}
                <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="border-2"
              style={{
                backgroundColor:
                  theme === "dark" ? "var(--outfitly-bg-secondary)" : "var(--outfitly-bg-white)",
                borderColor: "var(--outfitly-primary)",
              }}
            >
              {STYLES.map((style) => (
                <DropdownMenuItem
                  key={style}
                  onClick={() => setStyleFilter(style)}
                  style={{
                    color:
                      theme === "dark" ? "var(--outfitly-text-light)" : "var(--outfitly-primary)",
                  }}
                  className="cursor-pointer hover:bg-[#671425]/10"
                >
                  {style}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Season Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="transition-all duration-300 border-2 hover:scale-105"
                style={{
                  backgroundColor:
                    theme === "dark"
                      ? "var(--outfitly-bg-primary)"
                      : "var(--outfitly-bg-secondary)",
                  borderColor: "var(--outfitly-primary)",
                  color:
                    theme === "dark" ? "var(--outfitly-text-light)" : "var(--outfitly-primary)",
                }}
              >
                {seasonFilter}
                <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="border-2"
              style={{
                backgroundColor:
                  theme === "dark" ? "var(--outfitly-bg-secondary)" : "var(--outfitly-bg-white)",
                borderColor: "var(--outfitly-primary)",
              }}
            >
              {SEASONS.map((season) => (
                <DropdownMenuItem
                  key={season}
                  onClick={() => setSeasonFilter(season)}
                  style={{
                    color:
                      theme === "dark" ? "var(--outfitly-text-light)" : "var(--outfitly-primary)",
                  }}
                  className="cursor-pointer hover:bg-[#671425]/10"
                >
                  {season}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
};

export default Filters;
