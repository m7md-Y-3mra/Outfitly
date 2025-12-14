"use client";
import { Category } from "@/app/generated/prisma/browser";
import { motion } from "framer-motion";
import { useQueryState } from "nuqs";

const Categories = ({ categories }: { categories: Category[] }) => {
  const [categoryId, setCategoryId] = useQueryState("categoryId", {
    defaultValue: "",
    shallow: false,
  });
  const onCategoryChange = (id: string) => {
    setCategoryId(id);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-wrap gap-3"
    >
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`
            px-6 py-3 rounded-full transition-all duration-300
            ${
              categoryId === category.id
                ? "bg-linear-to-r from-[#671425] to-[#8B1D35] text-white shadow-lg shadow-[#671425]/30"
                : "bg-white dark:bg-[#2A2A30] text-[#4C1420] dark:text-white/80 hover:bg-[#F2E8E3] dark:hover:bg-[#35353D] border border-[#F2E8E3] dark:border-[#35353D]"
            }
          `}
        >
          {category.name}
        </button>
      ))}
    </motion.div>
  );
};

export default Categories;
