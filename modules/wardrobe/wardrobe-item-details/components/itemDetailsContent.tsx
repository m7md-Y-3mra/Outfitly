"use client";

import { useRouter } from "nextjs-toploader/app";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteConfirmationDialog } from "@/modules/wardrobe/my-wardrobe/components/delete-confirmation-dialog";
import ImageGallery from "./image-gallery";
import DetailsCard from "./details-card";
import ActionButtons from "./action-buttons";
import { useImageGallery } from "../hooks/useImageGallery";
import { useItemDetailsActions } from "../hooks/useItemDetailsActions";
import type { WardrobeItemWithImages } from "@/modules/wardrobe/types";

type ItemDetailsContentProps = {
  item: WardrobeItemWithImages;
};

export const ItemDetailsContent = ({ item }: ItemDetailsContentProps) => {
  const router = useRouter();
  const { sortedImages, selectedImage, setSelectedImage } = useImageGallery(item.images);
  const {
    handleEdit,
    handleDelete,
    handleConfirmDelete,
    isDeleteDialogOpen,
    closeDeleteDialog,
    isPending,
  } = useItemDetailsActions(item.id, item.name);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => router.push("/my-wardrobe")}
            className="group transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Wardrobe
          </Button>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ImageGallery
              sortedImages={sortedImages}
              selectedImage={selectedImage}
              onImageSelect={setSelectedImage}
              itemName={item.name}
            />
          </motion.div>

          {/* Right Column - Item Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <DetailsCard item={item} />

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <ActionButtons onEdit={handleEdit} onDelete={handleDelete} isPending={isPending} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={closeDeleteDialog}
        itemName={item.name}
        onConfirm={handleConfirmDelete}
        onCancel={closeDeleteDialog}
        isPending={isPending}
      />
    </div>
  );
};
