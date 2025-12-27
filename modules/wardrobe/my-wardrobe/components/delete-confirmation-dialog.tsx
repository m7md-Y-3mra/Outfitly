"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemName?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

export function DeleteConfirmationDialog({
  open,
  onOpenChange,
  itemName,
  onConfirm,
  onCancel,
  isPending,
}: DeleteConfirmationDialogProps) {
  const t = useTranslations("Wardrobe.deleteDialog");
  const tCommon = useTranslations("Common");

  return (
    <Dialog open={open} onOpenChange={!isPending ? onOpenChange : undefined}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title", { itemName: itemName ?? "" })}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={isPending}>
            {tCommon("cancel")}
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isPending}>
            {isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            {tCommon("delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
