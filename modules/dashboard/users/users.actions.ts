"use server";

import { revalidatePath } from "next/cache";
import userService from "@/modules/user/user.service";
import { adminMiddleware } from "@/middlewares/admin.middleware";

export async function updateUserAction(
  id: string,
  data: { fullName?: string; email?: string; isActive?: boolean },
) {
  await adminMiddleware();

  try {
    const updatedUser = await userService.updateUser(id, data);
    revalidatePath("/dashboard/users");
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("updateUserAction error:", error);
    return { success: false, error: "Failed to update user" };
  }
}

export async function updateUserRoleAction(id: string, role: "USER" | "ADMIN") {
  await adminMiddleware();

  try {
    const updatedUser = await userService.updateUserRole(id, role);
    revalidatePath("/dashboard/users");
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("updateUserRoleAction error:", error);
    return { success: false, error: "Failed to update user role" };
  }
}

export async function deleteUserAction(id: string) {
  await adminMiddleware();

  try {
    await userService.deleteUser(id);
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("deleteUserAction error:", error);
    return { success: false, error: "Failed to delete user" };
  }
}

export async function toggleUserStatusAction(id: string, isActive: boolean) {
  await adminMiddleware();

  try {
    const updatedUser = await userService.updateUser(id, { isActive });
    revalidatePath("/dashboard/users");
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("toggleUserStatusAction error:", error);
    return { success: false, error: "Failed to toggle user status" };
  }
}
