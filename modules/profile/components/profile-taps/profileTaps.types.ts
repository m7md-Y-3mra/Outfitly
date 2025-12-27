export interface ProfileTabsProps {
  activeTab: import("../../profile.types").TabType;
  onTabChange: (tab: import("../../profile.types").TabType) => void;
}
