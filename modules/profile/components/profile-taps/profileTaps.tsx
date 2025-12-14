import { motion } from "framer-motion";
import { Grid3X3, ShoppingBag, Heart } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import type { ProfileTabsProps } from "./profileTaps.types";
import { isTabActive } from "./profileTaps.utils";

const tabs = [
  { id: "outfits" as const, label: "My Outfits", icon: Grid3X3, count: 156 },
  { id: "liked-products" as const, label: "Liked Products", icon: ShoppingBag, count: 4 },
  { id: "liked-outfits" as const, label: "Liked Outfits", icon: Heart, count: 42 },
];

export function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mb-8"
    >
      <div className="p-2 rounded-2xl border-2 shadow-lg inline-flex gap-2 bg-card border-primary">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = isTabActive(activeTab, tab.id);
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                isActive ? "bg-primary text-primary-foreground" : "bg-muted text-primary"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden sm:inline">{tab.label}</span>
              <Badge className={`ml-1 ${isActive ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"}`}>
                {tab.count}
              </Badge>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}