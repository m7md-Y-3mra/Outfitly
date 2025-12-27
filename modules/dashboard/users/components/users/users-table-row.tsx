"use client";
import React, { useState } from "react";
import { MoreVertical, Edit, Trash2, Shield, ShieldOff, UserCheck, UserX } from "lucide-react";
import { motion } from "framer-motion";
import { NAVBAR_COLORS } from "@/components/navbar/navbar.constants";
import { UsersTableRowProps } from "@/modules/dashboard/users/types/users.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  updateUserAction,
  deleteUserAction,
  toggleUserStatusAction,
  updateUserRoleAction,
} from "@/modules/dashboard/users/users.actions";
import { toast } from "sonner";

const UserAvatar = ({ name }: { name: string }) => {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
      style={{
        background: NAVBAR_COLORS.primary,
        fontSize: "16px",
      }}
    >
      {initial}
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const isActive = status === "Active";
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
        isActive
          ? "bg-green-100 text-green-700 border border-green-200"
          : "bg-red-100 text-red-700 border border-red-200"
      }`}
    >
      {status}
    </span>
  );
};

export const UsersTableRow = ({ user }: UsersTableRowProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: user.name,
    email: user.email,
  });

  const isActive = user.status === "Active";

  const handleEdit = async () => {
    setIsLoading(true);
    const result = await updateUserAction(user.id, editForm);
    setIsLoading(false);

    if (result.success) {
      toast.success("User updated successfully");
      setEditDialogOpen(false);
    } else {
      toast.error(result.error || "Failed to update user");
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const result = await deleteUserAction(user.id);
    setIsLoading(false);

    if (result.success) {
      toast.success("User deleted successfully");
      setDeleteDialogOpen(false);
    } else {
      toast.error(result.error || "Failed to delete user");
    }
  };

  const handleToggleStatus = async () => {
    const result = await toggleUserStatusAction(user.id, !isActive);
    if (result.success) {
      toast.success(`User ${isActive ? "suspended" : "activated"} successfully`);
    } else {
      toast.error(result.error || "Failed to toggle user status");
    }
  };

  const handleToggleRole = async (newRole: "USER" | "ADMIN") => {
    const result = await updateUserRoleAction(user.id, newRole);
    if (result.success) {
      toast.success(`User role updated to ${newRole}`);
    } else {
      toast.error(result.error || "Failed to update user role");
    }
  };

  return (
    <>
      <motion.tr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="group hover:bg-stone-50/60 dark:hover:bg-stone-900/20 transition-colors duration-200"
      >
        <td className="py-4 px-6">
          <div className="flex items-center gap-4">
            <UserAvatar name={user.name} />
            <span className="font-semibold text-gray-900 dark:text-gray-100">{user.name}</span>
          </div>
        </td>
        <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400 font-medium">
          {user.email}
        </td>
        <td className="py-4 px-6">
          <span className="font-bold text-gray-700 dark:text-gray-300">{user.outfits}</span>
        </td>
        <td className="py-4 px-6">
          <StatusBadge status={user.status} />
        </td>
        <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400">{user.joined}</td>
        <td className="py-4 px-6 text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit User
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleToggleStatus}>
                {isActive ? (
                  <>
                    <UserX className="w-4 h-4 mr-2" />
                    Suspend User
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4 mr-2" />
                    Activate User
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleToggleRole("ADMIN")}>
                <Shield className="w-4 h-4 mr-2" />
                Make Admin
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleToggleRole("USER")}>
                <ShieldOff className="w-4 h-4 mr-2" />
                Remove Admin
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setDeleteDialogOpen(true)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </td>
      </motion.tr>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={editForm.fullName}
                onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {user.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
