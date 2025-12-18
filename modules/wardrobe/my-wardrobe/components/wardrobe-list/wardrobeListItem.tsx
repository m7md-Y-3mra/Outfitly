import { GetUserWardrobeItemResponse } from "@/modules/wardrobe/types/dto.types";
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDeleteWardrobeItem } from "../../hooks/useDeleteWardrobeItem";
import { DeleteConfirmationDialog } from "../delete-confirmation-dialog";

export function WardrobeListItem({
  item,
  index,
  onDelete,
}: {
  item: GetUserWardrobeItemResponse["items"][number];
  index: number;
  onDelete: (itemId: string) => void;
}) {
  const router = useRouter();
  const {
    isDeleteDialogOpen,
    itemToDelete,
    isPending,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
  } = useDeleteWardrobeItem();

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/my-wardrobe/edit/${item.id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openDeleteDialog({ id: item.id, name: item.name });
  };

  return (
    <>
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: (index + 1) * 0.05 }}
        onClick={() => router.push(`/my-wardrobe/item/${item.id}`)}
        className="group relative overflow-hidden rounded-2xl bg-white dark:bg-[#2A2A30] p-4 
                 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 
                 transition-all duration-300 cursor-pointer"
        role="link"
      >
        <div className="flex items-center gap-4">
          {/* Image */}
          <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
            <Image
              src={item.primaryImageUrl}
              alt={item.primaryImageAlt || `Image of ${item.name}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="96px" // Fixed size for list view
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[#4C1420] dark:text-white text-lg font-semibold truncate mb-1">
              {item.name}
            </h3>
            <p className="text-[#4C1420]/60 dark:text-white/60 capitalize text-sm">
              {item.category?.name}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
            <button
              className="p-3 rounded-xl bg-[#F2E8E3] dark:bg-[#35353D] text-[#4C1420] dark:text-white/60 
                       hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all duration-300"
              onClick={handleEditClick}
              aria-label={`Edit ${item.name}`}
            >
              <Edit className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              className="p-3 rounded-xl bg-[#F2E8E3] dark:bg-[#35353D] text-[#4C1420] dark:text-white/60 
                       hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 transition-all duration-300"
              onClick={handleDeleteClick}
              aria-label={`Delete ${item.name}`}
            >
              <Trash2 className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.div>
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={closeDeleteDialog}
        itemName={itemToDelete?.name}
        onConfirm={() => confirmDelete(onDelete)}
        onCancel={closeDeleteDialog}
        isPending={isPending}
      />
    </>
  );
}
