"use client";

import { motion } from "framer-motion";
import type { DetailItemProps } from "./detailItem.types";

const DetailItem = ({ icon: Icon, label, value, index }: DetailItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
      className="flex items-center gap-4 p-3 rounded-lg transition-all duration-300 bg-muted/30"
    >
      <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md transition-colors duration-300 bg-primary">
        <Icon className="w-5 h-5 text-primary-foreground" />
      </div>
      <div className="flex-1">
        <p className="text-sm opacity-70 transition-colors duration-300 text-muted-foreground">
          {label}
        </p>
        <p className="font-medium transition-colors duration-300">{value}</p>
      </div>
    </motion.div>
  );
};

export default DetailItem;
