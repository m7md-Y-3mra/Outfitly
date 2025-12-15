import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useRouter } from "next/router";

export function AddNewListCard() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => router.push("/wardrobe/add")}
      className="group relative overflow-hidden rounded-2xl bg-linear-to-r from-[#671425] to-[#8B1D35] 
                 p-6 cursor-pointer hover:shadow-xl hover:shadow-[#671425]/20 transition-all duration-300"
      aria-label="Add a new item to the wardrobe"
      role="button"
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <Plus className="w-8 h-8 text-white" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-white text-xl font-semibold">Add New Item</h3>
          <p className="text-white/80">Upload a new piece to your wardrobe</p>
        </div>
      </div>
    </motion.div>
  );
}
