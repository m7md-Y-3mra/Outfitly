"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import DetailItem from "../detail-item";
import { DETAIL_ITEMS_CONFIG } from "../../itemDetailsPage.constants";
import type { DetailsCardProps } from "./detailsCard.types";

const DetailsCard = ({ item }: DetailsCardProps) => {
  return (
    <Card className="p-8 border-2 transition-all duration-300 shadow-lg">
      {/* Header */}
      <div className="mb-6">
        <motion.h1
          className="text-4xl font-bold mb-2 transition-colors duration-300 bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {item.name}
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {item.brand}
        </motion.p>
      </div>

      {/* Details Grid */}
      <div className="space-y-4 mb-6">
        {DETAIL_ITEMS_CONFIG.map((config, index) => (
          <DetailItem
            key={config.label}
            icon={config.icon}
            label={config.label}
            value={config.valueGetter(item)}
            index={index}
          />
        ))}
      </div>

      {/* Notes Section */}
      {item.notes && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-6"
        >
          <h3 className="text-lg font-semibold mb-3 transition-colors duration-300">Notes</h3>
          <div className="p-4 rounded-lg transition-all duration-300 bg-muted/30">
            <p className="text-sm leading-relaxed transition-colors duration-300 text-muted-foreground">
              {item.notes}
            </p>
          </div>
        </motion.div>
      )}

      {/* Decorative Gradient Line */}
      <motion.div
        className="mt-8 h-1 bg-linear-to-r from-primary via-primary/80 to-primary/60 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1, delay: 0.9 }}
      />
    </Card>
  );
};

export default DetailsCard;
