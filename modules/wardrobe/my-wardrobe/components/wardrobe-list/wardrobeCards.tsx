"use client";
import { GetUserWardrobeItemResponse } from "@/modules/wardrobe/types/dto.types";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useViewMode } from "../../provider/viewMode.provider";

export function WardrobeCards({ wardrobeItems }: { wardrobeItems: GetUserWardrobeItemResponse }) {
  const router = useRouter();
  const { viewMode, toggleMode } = useViewMode();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-8 space-y-4"
    >
      {/* Add New Item - List View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => router.push("/wardrobe/add")}
        transition={{ duration: 0.5 }}
        className="group relative overflow-hidden rounded-2xl bg-linear-to-r from-[#671425] to-[#8B1D35] p-6 cursor-pointer hover:shadow-xl hover:shadow-[#671425]/20 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-white">Add New Item</h3>
            <p className="text-white/80">Upload a new piece to your wardrobe</p>
          </div>
        </div>
      </motion.div>

      {/* Items List */}
      {wardrobeItems.items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: (index + 1) * 0.05 }}
          onClick={() => router.push(`/wardrobe/item/${item.id}`)}
          className="group relative overflow-hidden rounded-2xl bg-white dark:bg-[#2A2A30] p-4 hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center gap-4">
            {/* Image */}
            <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
              <Image
                src={item.primaryImageUrl}
                alt={item.primaryImageAlt}
                width={24}
                height={24}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h3 className="text-[#4C1420] dark:text-white mb-1">{item.name}</h3>
              <p className="text-[#4C1420]/60 dark:text-white/60 capitalize">
                {item.category?.name}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                className="p-3 rounded-xl bg-[#F2E8E3] dark:bg-[#35353D] text-[#4C1420] dark:text-white/60 hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all duration-300"
                aria-label="Edit"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                className="p-3 rounded-xl bg-[#F2E8E3] dark:bg-[#35353D] text-[#4C1420] dark:text-white/60 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 transition-all duration-300"
                aria-label="Delete"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
