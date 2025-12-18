"use client";

import { motion } from "framer-motion";
import MotionSelect from "@/components/motioned-select";
import MotionCombobox from "@/components/motioned-combobox";
import MotionTextarea from "@/components/motioned-textarea";
import { STYLE_OPTIONS } from "../../wardrobeForm.constants";
import type { Category } from "@/app/generated/prisma/browser";
import type { SelectOption } from "@/components/motioned-select";
import MotionField from "@/components/motioned-input/motionedInput";

interface ItemDetailsFormProps {
  categories: Category[];
  brands: string[];
  isLoadingCategories?: boolean;
  isLoadingBrands?: boolean;
}

const ItemDetailsForm: React.FC<ItemDetailsFormProps> = ({
  categories,
  brands,
  isLoadingCategories = false,
  isLoadingBrands = false,
}) => {
  // Transform categories to SelectOption format
  const categoryOptions: SelectOption[] = categories.map((cat) => ({
    label: cat.name,
    value: cat.name,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className=" bg-white dark:bg-[#2A2A30] rounded-2xl p-6 md:p-8 shadow-lg"
    >
      <h2 className="text-[#4C1420] dark:text-white mb-6">Item Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <MotionField
          name="name"
          label="Item Name"
          type="text"
          placeholder="e.g., Blue Denim Jacket"
        />

        {/* Category */}
        <MotionSelect
          name="categoryName"
          label="Category"
          options={categoryOptions}
          placeholder="Select category..."
          disabled={isLoadingCategories}
        />

        {/* Brand */}
        <MotionCombobox
          name="brand"
          label="Brand"
          options={brands}
          placeholder="Select or type brand..."
          disabled={isLoadingBrands}
        />

        {/* Color */}
        <MotionField name="color" label="Color" type="text" placeholder="e.g., Navy Blue" />

        {/* Size */}
        <MotionField name="size" label="Size" type="text" placeholder="e.g., M, L, XL" />

        {/* Season */}
        <MotionField name="season" label="Season" type="text" placeholder="e.g., Summer, Winter" />

        {/* Style */}
        <MotionSelect
          name="style"
          label="Style"
          options={STYLE_OPTIONS}
          placeholder="Select style..."
        />

        {/* Purchased Date */}
        <MotionField name="purchasedDate" label="Purchased Date" type="date" />
      </div>

      {/* Notes - Full width */}
      <MotionTextarea
        name="notes"
        label="Notes (Optional)"
        rows={4}
        placeholder="Add any additional notes about this item..."
      />
    </motion.div>
  );
};

export default ItemDetailsForm;
