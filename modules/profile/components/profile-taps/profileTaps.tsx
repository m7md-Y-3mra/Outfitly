"use client";

import { motion } from "framer-motion";
import { Grid3X3, Heart } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import type { ProfileTabsWithCountsProps } from "./profileTaps.types";
import { isTabActive } from "./profileTaps.utils";
import { tabs } from "./profileTabs.constants";

export function ProfileTabs({ activeTab, onTabChange, counts }: ProfileTabsWithCountsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mb-8"
    >
      <div className="p-2 rounded-2xl border-2 shadow-lg inline-flex gap-2 bg-card dark:bg-outfitly-bg-secondary border-primary dark:border-outfitly-primary">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = isTabActive(activeTab, tab.id);
          const count = counts[tab.id === "outfits" ? "outfits" : "likedOutfits"];

          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300
                ${
                  isActive
                    ? "bg-primary text-primary-foreground border-outfitly-primary dark:border-outfitly-primary"
                    : "bg-muted text-primary border-transparent dark:bg-outfitly-bg-primary dark:text-outfitly-text-light"
                }`}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden sm:inline">{tab.label}</span>
              <Badge className="ml-1">{count}</Badge>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
