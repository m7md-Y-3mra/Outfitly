"use client";

import { motion } from "framer-motion";
import MotionSelect from "@/components/motioned-select";
import MotionCombobox from "@/components/motioned-combobox";
import MotionTextarea from "@/components/motioned-textarea";
import type { Category } from "@/app/generated/prisma/browser";
import type { SelectOption } from "@/components/motioned-select";
import MotionField from "@/components/motioned-input/motionedInput";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Wardrobe");

  // Transform categories to SelectOption format
  const categoryOptions: SelectOption[] = categories.map((cat) => ({
    label: cat.name,
    value: cat.name,
  }));

  // Style options with translations
  const styleOptions: SelectOption[] = [
    { label: t("styles.casual"), value: "CASUAL" },
    { label: t("styles.formal"), value: "FORMAL" },
    { label: t("styles.work"), value: "WORK" },
    { label: t("styles.sporty"), value: "SPORTY" },
    { label: t("styles.streetwear"), value: "STREETWEAR" },
    { label: t("styles.loungewear"), value: "LOUNGEWEAR" },
    { label: t("styles.party"), value: "PARTY" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className=" bg-white dark:bg-[#2A2A30] rounded-2xl p-6 md:p-8 shadow-lg"
    >
      <h2 className="text-[#4C1420] dark:text-white mb-6">{t("form.sectionTitle")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <MotionField
          name="name"
          label={t("form.itemName")}
          type="text"
          placeholder={t("form.itemNamePlaceholder")}
        />

        {/* Category */}
        <MotionSelect
          name="categoryName"
          label={t("form.category")}
          options={categoryOptions}
          placeholder={t("form.categoryPlaceholder")}
          disabled={isLoadingCategories}
        />

        {/* Brand */}
        <MotionCombobox
          name="brand"
          label={t("form.brand")}
          options={brands}
          placeholder={t("form.brandPlaceholder")}
          disabled={isLoadingBrands}
        />

        {/* Color */}
        <MotionField
          name="color"
          label={t("form.color")}
          type="text"
          placeholder={t("form.colorPlaceholder")}
        />

        {/* Size */}
        <MotionField
          name="size"
          label={t("form.size")}
          type="text"
          placeholder={t("form.sizePlaceholder")}
        />

        {/* Season */}
        <MotionField
          name="season"
          label={t("form.season")}
          type="text"
          placeholder={t("form.seasonPlaceholder")}
        />

        {/* Style */}
        <MotionSelect
          name="style"
          label={t("form.style")}
          options={styleOptions}
          placeholder={t("form.stylePlaceholder")}
        />

        {/* Purchased Date */}
        <MotionField name="purchasedDate" label={t("form.purchasedDate")} type="date" />
      </div>

      {/* Notes - Full width */}
      <MotionTextarea
        name="notes"
        label={t("form.notes")}
        rows={4}
        placeholder={t("form.notesPlaceholder")}
      />
    </motion.div>
  );
};

export default ItemDetailsForm;
