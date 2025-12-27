"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { useProfile } from "./hooks/useProfile";
import type { TabType, Outfit, LikedProduct } from "./profile.types";
import { ProfileHeader } from "./components/profile-header/profileHeader";
import { ProfileTabs } from "./components/profile-taps/profileTaps"; // Updated import
import { ProfileOutfitsGrid } from "./components/profile-outfits/profileOutfits";
import { ProfileLikedProductsGrid } from "./components/profile-liked-products/likedProducts";
import { ProfileLikedOutfitsGrid } from "./components/profile-liked-outfits/likedOutfits";
import Loading from "@/app/loading";

function renderContent(
  activeTab: TabType,
  outfits: Outfit[],
  likedProducts: LikedProduct[],
  likedOutfits: Outfit[],
) {
  switch (activeTab) {
    case "outfits":
      return <ProfileOutfitsGrid outfits={outfits} />;
    case "liked-products":
      return <ProfileLikedProductsGrid products={likedProducts} />;
    case "liked-outfits":
      return <ProfileLikedOutfitsGrid outfits={likedOutfits} />;
  }
}

export function ProfilePage() {
  const {
    activeTab,
    setActiveTab,
    user,
    isEditing,
    editForm,
    loading,
    outfits,
    likedProducts,
    likedOutfits,
    startEditing,
    cancelEditing,
    saveEditing,
    updateEditForm,
  } = useProfile();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background transition-colors duration-300 flex items-center justify-center">
        <div>No profile found. Please log in.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <main className="pt-20 pb-16">
        <PageHeader title="Profile" subtitle="Your personal style collection" />
        <div className="container mx-auto px-4 max-w-6xl mt-12">
          <ProfileHeader
            user={user}
            isEditing={isEditing}
            editForm={editForm}
            onStartEditing={startEditing}
            onCancelEditing={cancelEditing}
            onSaveEditing={saveEditing}
            onUpdateForm={updateEditForm}
          />
          <ProfileTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            counts={{
              outfits: outfits.length,
              likedProducts: likedProducts.length,
              likedOutfits: likedOutfits.length,
            }}
          />
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent(activeTab, outfits, likedProducts, likedOutfits)}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
