"use server";

import { revalidatePath } from "next/cache";
import { deleteOutfitService } from "@/modules/outfit/outfit.service";
import { adminMiddleware } from "@/middlewares/admin.middleware";

export async function deleteOutfitAction(id: string) {
  await adminMiddleware();

  try {
    await deleteOutfitService(id);
    revalidatePath("/dashboard/outfits");
    return { success: true };
  } catch (error) {
    console.error("deleteOutfitAction error:", error);
    return { success: false, error: "Failed to delete outfit" };
  }
}
