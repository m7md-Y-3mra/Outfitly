import { motion } from "framer-motion";
import { Card } from "../../../../components/ui/card"; // Or '@/components/ui/card'
import { Badge } from "../../../../components/ui/badge"; // Or '@/components/ui/badge'
import { useTheme } from "next-themes";
import { WardrobeItem } from "../../weather.types";

interface WardrobeItemCardProps {
  item: WardrobeItem;
  index: number;
}

export const WardrobeItemCard: React.FC<WardrobeItemCardProps> = ({ item, index }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.05 * index }}
      className="flex-shrink-0 w-48 snap-start"
    >
      <Card
        className="group cursor-pointer overflow-hidden border-2 transition-all duration-300 hover:shadow-xl"
        style={{
          borderColor:
            theme === "dark" ? "var(--outfitly-bg-tertiary)" : "var(--outfitly-bg-secondary)",
          backgroundColor: "var(--card)",
        }}
      >
        <div className="relative overflow-hidden aspect-square">
          <motion.img
            src={item.image}
            alt={item.name} // Added for accessibility
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Category Badge */}
          <div className="absolute top-2 right-2">
            <Badge
              className="backdrop-blur-sm shadow-md text-xs"
              style={{
                backgroundColor: "rgba(103, 20, 37, 0.9)", // Kept as rgba since --outfitly-primary is hex; matches #671425
                color: "var(--outfitly-text-light)",
              }}
            >
              {item.category}
            </Badge>
          </div>
        </div>

        <div className="p-3">
          <h4
            className="text-sm transition-colors duration-300"
            style={{
              color: theme === "dark" ? "var(--outfitly-text-primary)" : "var(--outfitly-primary)",
            }}
          >
            {item.name}
          </h4>
        </div>
      </Card>
    </motion.div>
  );
};
