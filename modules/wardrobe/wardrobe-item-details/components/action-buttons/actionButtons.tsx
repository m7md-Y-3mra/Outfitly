"use client";

import { motion } from "framer-motion";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ActionButtonsProps } from "./actionButtons.types";

const ActionButtons = ({ onEdit, onDelete, isPending }: ActionButtonsProps) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button onClick={onEdit} className="w-full" size="lg">
          <Edit2 className="w-4 h-4" />
          Edit
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={onDelete}
          variant="outline"
          className="w-full"
          size="lg"
          disabled={isPending}
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
      </motion.div>
    </div>
  );
};

export default ActionButtons;
