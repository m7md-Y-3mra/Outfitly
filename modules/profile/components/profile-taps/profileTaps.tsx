import { motion } from "framer-motion";
import { Grid3X3, Heart } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import type { ProfileTabsProps } from "./profileTaps.types";
import { isTabActive } from "./profileTaps.utils";
import { useTheme } from "next-themes";

const tabs = [
  { id: "outfits" as const, label: "My Outfits", icon: Grid3X3 },
  { id: "liked-outfits" as const, label: "Liked Outfits", icon: Heart },
];

interface ProfileTabsWithCountsProps {
  activeTab: ProfileTabsProps["activeTab"];
  onTabChange: ProfileTabsProps["onTabChange"];
  counts: {
    outfits: number;
    likedProducts: number;
    likedOutfits: number;
  };
}

export function ProfileTabs({ activeTab, onTabChange, counts }: ProfileTabsWithCountsProps) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mb-8"
    >
      <div
        className="p-2 rounded-2xl border-2 shadow-lg inline-flex gap-2 bg-card border-primary"
        style={{
          backgroundColor:
            theme === "dark" ? "var(--outfitly-bg-secondary)" : "var(--outfitly-bg-white)",
          borderColor:
            theme === "dark" ? "var(--outfitly-primary)" : "var(--outfitly-bg-secondary)",
        }}
      >
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
              // Updated: Conditional inline styles to avoid overriding Tailwind classes for active state
              style={
                isActive
                  ? {
                      // Active: Use primary red background and light text (matches --primary and --primary-foreground)
                      backgroundColor: "var(--primary)", // #671425 in dark mode
                      color: "var(--primary-foreground)", // #FAF1ED in dark mode
                      borderColor: "var(--outfitly-primary)",
                    }
                  : {
                      // Inactive: Use background colors as before
                      backgroundColor:
                        theme === "dark"
                          ? "var(--outfitly-bg-primary)"
                          : "var(--outfitly-bg-secondary)",
                      borderColor: "var(--outfitly-primary)",
                      color:
                        theme === "dark" ? "var(--outfitly-text-light)" : "var(--outfitly-primary)",
                    }
              }
              className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                isActive
                  ? "bg-primary text-primary-foreground" // Tailwind classes for active (now not overridden)
                  : "bg-muted text-primary-foreground" // Tailwind classes for inactive
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden sm:inline">{tab.label}</span>
              <Badge className={`ml-1 `}>{count}</Badge>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
