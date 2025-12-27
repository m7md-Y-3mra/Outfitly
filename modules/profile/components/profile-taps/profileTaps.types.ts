export interface ProfileTabsProps {
  activeTab: import("../../profile.types").TabType;
  onTabChange: (tab: import("../../profile.types").TabType) => void;
}
export interface ProfileTabsWithCountsProps {
  activeTab: ProfileTabsProps["activeTab"];
  onTabChange: ProfileTabsProps["onTabChange"];
  counts: {
    outfits: number;
    likedProducts: number;
    likedOutfits: number;
  };
}