import type { Metadata } from "next";
import ExplorePage from "@/modules/explore";

export const metadata: Metadata = {
  title: "Explore Outfits",
  description:
    "Explore outfit ideas and get inspired. Discover new styles and trends to elevate your wardrobe.",
};

const Explore = () => {
  return <ExplorePage />;
};

export default Explore;
