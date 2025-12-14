"use client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { useProfile } from "./hooks/useProfile";
import { mockUser, mockOutfits, mockLikedProducts } from "./profile.constants";
import type { TabType } from "./profile.types";
import { ProfileHeader } from "./components/profile-header/profileHeader";
import { ProfileTabs } from "./components/profile-taps/profileTaps";
import { ProfileOutfitsGrid } from "./components/profile-outfits/profileOutfits";
import { ProfileLikedProductsGrid } from "./components/profile-liked-products/likedProducts";
import { ProfileLikedOutfitsGrid } from "./components/profile-liked-outfits/likedOutfits";

function renderContent(activeTab: TabType) {
  switch (activeTab) {
    case "outfits":
      return <ProfileOutfitsGrid outfits={mockOutfits} />;
    case "liked-products":
      return <ProfileLikedProductsGrid products={mockLikedProducts} />;
    case "liked-outfits":
      return <ProfileLikedOutfitsGrid outfits={mockOutfits} />;
  }
}

export function ProfilePage() {
  const { activeTab, setActiveTab } = useProfile();

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <main className="pt-20 pb-16">
        <PageHeader title="Profile" subtitle="Your personal style collection" />
        <div className="container mx-auto px-4 max-w-6xl mt-12">
          <ProfileHeader user={mockUser} />
          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent(activeTab)}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
