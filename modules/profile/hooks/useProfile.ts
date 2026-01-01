import { useState, useEffect, useCallback } from "react";
import type { TabType, User, Outfit, WardrobeItem } from "../profile.types";
import { useAuth } from "@/providers/auth/auth.provider";
import {
  getUserProfile,
  getUserOutfitsPaginated,
  getLikedOutfitsPaginated,
  updateProfile,
  getUserWardrobeItemsPaginated,
} from "../profile.service";
import type { IPaginationQuery } from "@/@types/database.type";

export function useProfile() {
  const { user: authUser } = useAuth();

  const [activeTab, setActiveTab] = useState<TabType>("outfits");

  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<User | null>(null);

  const [profileLoading, setProfileLoading] = useState(true);
  const [outfitsLoading, setOutfitsLoading] = useState(true);
  const [likedOutfitsLoading, setLikedOutfitsLoading] = useState(true);

  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [likedOutfits, setLikedOutfits] = useState<Outfit[]>([]);

  const fetchProfile = useCallback(async () => {
    if (!authUser?.id) return;

    try {
      setProfileLoading(true);
      const profile = await getUserProfile(authUser.id);
      if (profile) {
        setUser(profile);
        setEditForm(profile);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setProfileLoading(false);
    }
  }, [authUser?.id]);

  const fetchOutfits = useCallback(
    async (query: IPaginationQuery = { page: 1, limit: 10 }) => {
      if (!authUser?.id) return;

      try {
        setOutfitsLoading(true);
        const result = await getUserOutfitsPaginated(authUser.id, query);
        setOutfits(result.data);
      } catch (error) {
        console.error("Failed to fetch outfits:", error);
      } finally {
        setOutfitsLoading(false);
      }
    },
    [authUser?.id],
  );

  const fetchLikedOutfits = useCallback(
    async (query: IPaginationQuery = { page: 1, limit: 10 }) => {
      if (!authUser?.id) return;

      try {
        setLikedOutfitsLoading(true);
        const result = await getLikedOutfitsPaginated(authUser.id, query);
        setLikedOutfits(result.data);
      } catch (error) {
        console.error("Failed to fetch liked outfits:", error);
      } finally {
        setLikedOutfitsLoading(false);
      }
    },
    [authUser?.id],
  );

  const fetchWardrobeItems = useCallback(
    async (query: IPaginationQuery = { page: 1, limit: 10 }) => {
      if (!authUser?.id) return;

      try {
        const result = await getUserWardrobeItemsPaginated(authUser.id, query);
        setItems(result.data);
      } catch (error) {
        console.error("Failed to fetch wardrobe items:", error);
      }
    },
    [authUser?.id],
  );

  useEffect(() => {
    if (!authUser?.id) return;

    fetchProfile();
    fetchOutfits();
    fetchLikedOutfits();
    fetchWardrobeItems();
  }, [authUser?.id, fetchProfile, fetchOutfits, fetchLikedOutfits, fetchWardrobeItems]);

  const startEditing = () => {
    if (!user) return;
    setEditForm(user);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditForm(user);
  };

  const saveEditing = async () => {
    if (!editForm || !authUser?.id) return;

    if (!editForm.name.trim()) {
      alert("Name is required");
      return;
    }

    await updateProfile(authUser.id, {
      name: editForm.name.trim(),
      bio: editForm.bio || undefined,
      location: editForm.location || undefined,
      website: editForm.website || undefined,
      avatarUrl: editForm.avatarUrl || undefined,
    });

    await fetchProfile();
    setIsEditing(false);
  };

  const updateEditForm = (field: keyof User, value: string) => {
    setEditForm((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  return {
    activeTab,
    setActiveTab,
    user,
    isEditing,
    editForm,
    profileLoading,
    outfitsLoading,
    likedOutfitsLoading,
    outfits,
    items,
    likedOutfits,
    startEditing,
    cancelEditing,
    saveEditing,
    updateEditForm,
    fetchOutfits,
    fetchLikedOutfits,
    fetchWardrobeItems,
  };
}
