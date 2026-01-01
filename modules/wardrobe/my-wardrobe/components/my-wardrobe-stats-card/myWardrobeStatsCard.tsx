"use client";
import { motion } from "framer-motion";
import { myWardrobeStatsCardProps } from "./myWardrobeStatsCard.types";
import { FC } from "react";

const MyWardrobeStatsCard: FC<myWardrobeStatsCardProps> = ({
  label,
  gradient,
  icon,
  value,
  index,
}) => {
  const Icon = icon;
  return (
    <motion.div
      key={label}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-card shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300`}
      ></div>

      {/* Content */}
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-linear-to-br ${gradient} shadow-md`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>

        <div>
          <p className="text-card-foreground dark:text-white/60 mb-1">{label}</p>
          <p className="text-card-foreground dark:text-white group-hover:scale-105 transition-transform duration-300 inline-block">
            {value}
          </p>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-linear-to-br from-white/20 to-transparent dark:from-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
    </motion.div>
  );
};

export default MyWardrobeStatsCard;
