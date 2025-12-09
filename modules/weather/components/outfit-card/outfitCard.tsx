import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Card } from '../../../../components/ui/card'; // Or '@/components/ui/card'
import { Badge } from '../../../../components/ui/badge'; // Or '@/components/ui/badge'
import { useTheme } from "next-themes";
import { Outfit } from '../../weather.types';

interface OutfitCardProps {
  outfit: Outfit;
  index: number;
}

export const OutfitCard: React.FC<OutfitCardProps> = ({ outfit, index }) => {
  const { theme } = useTheme();
  const TimeIcon = outfit.icon; // Dynamically assign the icon component

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <Card
        className="group cursor-pointer overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl h-full"
        style={{
          borderColor: theme === "dark" ? "#35353D" : "#F2E8E3",
          backgroundColor: theme === "dark" ? "#2A2A30" : "#FFFFFF",
        }}
      >
        {/* Time Badge Section */}
        <div
          className="p-4 border-b-2 transition-all duration-300"
          style={{
            borderColor: theme === "dark" ? "#35353D" : "#F2E8E3",
            background: theme === "dark"
              ? "linear-gradient(135deg, rgba(103, 20, 37, 0.1) 0%, rgba(139, 29, 53, 0.05) 100%)"
              : "linear-gradient(135deg, rgba(103, 20, 37, 0.05) 0%, rgba(139, 29, 53, 0.02) 100%)",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
                style={{
                  background: "linear-gradient(135deg, #671425 0%, #8B1D35 100%)",
                }}
              >
                <TimeIcon className="w-5 h-5" style={{ color: "#FAF1ED" }} />
              </div>
              <div>
                <div
                  className="transition-colors duration-300"
                  style={{
                    color: theme === "dark" ? "#FAF1ED" : "#671425",
                    fontWeight: "700",
                  }}
                >
                  {outfit.time}
                </div>
                <div
                  className="text-xs opacity-70 transition-colors duration-300"
                  style={{ color: theme === "dark" ? "#FAF1ED" : "#4C1420" }}
                >
                  {outfit.timeRange}
                </div>
              </div>
            </div>
            <Badge
              className="shadow-md"
              style={{
                backgroundColor: theme === "dark" ? "#1a1a1a" : "#F2E8E3",
                color: theme === "dark" ? "#FAF1ED" : "#671425",
              }}
            >
              {outfit.temperature}
            </Badge>
          </div>
        </div>

        {/* Outfit Image with Overlay */}
        <div className="relative overflow-hidden aspect-[3/4]">
          <motion.img
            src={outfit.image}
            alt={outfit.name} // Added for accessibility
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          {/* Outfit Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white mb-1">{outfit.name}</h3>
            <p className="text-white/80 text-sm">{outfit.description}</p>
          </div>
        </div>

        {/* View Button */}
        <div className="p-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-4 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #671425 0%, #8B1D35 100%)",
              color: "#FAF1ED",
            }}
            onClick={() => {
              // Add navigation or action here, e.g., router.push('/outfit/' + outfit.id)
              console.log('View outfit:', outfit.id);
            }} // Placeholder for functionality
          >
            <span>View Outfit</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </Card>
    </motion.div>
  );
};
