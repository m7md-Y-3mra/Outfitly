import { useRouter } from "nextjs-toploader/app";
import { useDeleteWardrobeItem } from "@/modules/wardrobe/my-wardrobe/hooks/useDeleteWardrobeItem";

export const useItemDetailsActions = (itemId: string, itemName: string) => {
  const router = useRouter();
  const { isDeleteDialogOpen, isPending, openDeleteDialog, closeDeleteDialog, confirmDelete } =
    useDeleteWardrobeItem();

  const handleEdit = () => {
    router.push(`/my-wardrobe/edit/${itemId}`);
  };

  const handleDelete = () => {
    openDeleteDialog({ id: itemId, name: itemName });
  };

  const handleConfirmDelete = () => {
    confirmDelete(() => {
      router.push("/my-wardrobe");
    });
  };

  return {
    handleEdit,
    handleDelete,
    handleConfirmDelete,
    isDeleteDialogOpen,
    closeDeleteDialog,
    isPending,
  };
};
