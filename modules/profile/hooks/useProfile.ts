import { useState, useEffect } from "react";
import type { TabType, User, Outfit, LikedProduct, WardrobeItem } from "../profile.types";
import { useAuth } from "@/providers/auth/auth.provider"; // Your auth store
import {
  getUserProfile,
  getUserOutfitsPaginated,
  getLikedOutfitsPaginated,
  getLikedProductsPaginated,
  updateProfile,
  getUserWardrobeItemsPaginated,
} from "../profile.service";
import type { IPaginationQuery } from "@/@types/database.type";
export function useProfile() {
  const { user: authUser } = useAuth(); // Get current user ID
  const [activeTab, setActiveTab] = useState<TabType>("outfits");
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [likedOutfits, setLikedOutfits] = useState<Outfit[]>([]);
  const [likedProducts, setLikedProducts] = useState<LikedProduct[]>([]);

  useEffect(() => {
    if (authUser?.id) {
      fetchProfile();
      fetchOutfits();
      fetchWardrobeItems();
      fetchLikedOutfits();
      fetchLikedProducts();
    }
  }, [authUser?.id]);

  const fetchProfile = async () => {
    try {
      console.log("Fetching profile for user:", authUser?.id);
      const profile = await getUserProfile(authUser!.id);
      if (profile) {
        setUser(profile); // Repo already returns User type, no mapping needed
        setEditForm(profile);
        console.log("Profile fetched and set:", profile);
      } else {
        console.error("No profile data returned");
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOutfits = async (query: IPaginationQuery = { page: 1, limit: 10 }) => {
    try {
      const result = await getUserOutfitsPaginated(authUser!.id, query);
      setOutfits(result.data); // Repo already returns Outfit[], no mapping needed
    } catch (error) {
      console.error("Failed to fetch outfits:", error);
    }
  };

  const fetchWardrobeItems = async (query: IPaginationQuery = { page: 1, limit: 10 }) => {
    try {
      const result = await getUserWardrobeItemsPaginated(authUser!.id, query);
      setItems(result.data);
    } catch (error) {
      console.error("Failed to fetch wardrobe items:", error);
    }
  };

  const fetchLikedOutfits = async (query: IPaginationQuery = { page: 1, limit: 10 }) => {
    try {
      const result = await getLikedOutfitsPaginated(authUser!.id, query);
      setLikedOutfits(result.data); // Repo already returns Outfit[], no mapping needed
    } catch (error) {
      console.error("Failed to fetch liked outfits:", error);
    }
  };

  const fetchLikedProducts = async (query: IPaginationQuery = { page: 1, limit: 10 }) => {
    try {
      const result = await getLikedProductsPaginated(authUser!.id, query);
      setLikedProducts(result.data); // Repo already returns LikedProduct[], no mapping needed
    } catch (error) {
      console.error("Failed to fetch liked products:", error);
    }
  };

  const startEditing = () => {
    if (user) {
      setEditForm(user);
      setIsEditing(true);
    }
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
    loading,
    outfits,
    items,
    likedOutfits,
    likedProducts,
    startEditing,
    cancelEditing,
    saveEditing,
    updateEditForm,
    fetchOutfits,
    fetchLikedOutfits,
    fetchLikedProducts,
    fetchWardrobeItems,
  };
}
