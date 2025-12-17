import { GetUserWardrobeItemResponse } from "@/modules/wardrobe/types/dto.types";
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function WardrobeGridItem({
  item,
  index,
}: {
  item: GetUserWardrobeItemResponse["items"][number];
  index: number;
}) {
  const router = useRouter();

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/my-wardrobe/edit/${item.id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Add delete confirmation dialog
    console.log(`Deleting item ${item.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: (index + 1) * 0.05 }}
      onClick={() => router.push(`/wardrobe/item/${item.id}`)}
      className="group relative aspect-3/4 rounded-2xl overflow-hidden cursor-pointer 
                 shadow-lg hover:shadow-2xl hover:shadow-[#671425]/20 
                 transition-all duration-500 transform hover:-translate-y-1"
      role="link"
    >
      {/* Image (Optimized for Next.js Image) */}
      <Image
        src={item.primaryImageUrl}
        alt={item.primaryImageAlt || `Image of ${item.name}`}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        priority={index < 4} // Prioritize first few images for better LCP
      />

      {/* Overlay & Info */}
      <div
        className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent 
                      opacity-80 group-hover:opacity-100 transition-opacity duration-300"
      ></div>

      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white text-lg font-semibold mb-1 truncate">{item.name}</h3>
        <p className="text-white/80 capitalize mb-3 text-sm">{item.category?.name}</p>

        {/* Action Buttons */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="flex-1 py-2 px-3 rounded-lg bg-white/20 backdrop-blur-md text-white hover:bg-white/30 
                       transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
            onClick={handleEditClick}
            aria-label={`Edit ${item.name}`}
          >
            <Edit className="w-4 h-4" aria-hidden="true" />
            <span>Edit</span>
          </button>
          <button
            className="py-2 px-3 rounded-lg bg-red-500/20 backdrop-blur-md text-white hover:bg-red-500/30 
                       transition-all duration-300 flex items-center justify-center"
            onClick={handleDeleteClick}
            aria-label={`Delete ${item.name}`}
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
