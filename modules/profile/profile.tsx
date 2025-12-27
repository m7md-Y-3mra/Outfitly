"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { useProfile } from "./hooks/useProfile";
import type { TabType, Outfit } from "./profile.types";

import { ProfileHeader } from "./components/profile-header/profileHeader";
import { ProfileHeaderSkeleton } from "./components/profile-header/ProfileHeaderSkeleton";

import { ProfileTabs } from "./components/profile-taps/profileTaps";
import { ProfileOutfitsGrid } from "./components/profile-outfits/profileOutfits";
import { ProfileOutfitsSkeleton } from "./components/profile-outfits/ProfileOutfitsSkeleton";
import { ProfileLikedOutfitsGrid } from "./components/profile-liked-outfits/likedOutfits";

function renderContent(
  activeTab: TabType,
  outfits: Outfit[],
  likedOutfits: Outfit[],
  outfitsLoading: boolean,
  likedOutfitsLoading: boolean,
) {
  if (activeTab === "outfits") {
    return outfitsLoading ? (
      <ProfileOutfitsSkeleton />
    ) : (
      <ProfileOutfitsGrid outfits={outfits} />
    );
  }

  if (activeTab === "liked-outfits") {
    return likedOutfitsLoading ? (
      <ProfileOutfitsSkeleton />
    ) : (
      <ProfileLikedOutfitsGrid outfits={likedOutfits} />
    );
  }

  return null;
}

export function ProfilePage() {
  const {
    activeTab,
    setActiveTab,

    user,
    isEditing,
    editForm,

    profileLoading,
    outfitsLoading,
    likedOutfitsLoading,

    outfits,
    likedOutfits,

    startEditing,
    cancelEditing,
    saveEditing,
    updateEditForm,
  } = useProfile();

  if (!profileLoading && !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div>No profile found. Please log in.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />

      <main className="pt-20 pb-16">
        <PageHeader
          title="Profile"
          subtitle="Your personal style collection"
        />

        <div className="container mx-auto px-4 max-w-6xl mt-12">
          {/* 🔹 Profile Header */}
          {profileLoading ? (
            <ProfileHeaderSkeleton />
          ) : (
            user && (
              <ProfileHeader
                user={user}
                isEditing={isEditing}
                editForm={editForm}
                onStartEditing={startEditing}
                onCancelEditing={cancelEditing}
                onSaveEditing={saveEditing}
                onUpdateForm={updateEditForm}
              />
            )
          )}

          {/* 🔹 Tabs (always visible) */}
          <ProfileTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            counts={{
              outfits: outfits.length,
              likedOutfits: likedOutfits.length,
            }}
          />

          {/* 🔹 Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {renderContent(
              activeTab,
              outfits,
              likedOutfits,
              outfitsLoading,
              likedOutfitsLoading,
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
