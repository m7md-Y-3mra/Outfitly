"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, User, Filter, ChevronDown } from "lucide-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

interface Outfit {
  id: string;
  image: string;
  username: string;
  likes: number;
  isLiked: boolean;
  style?: string;
  season?: string;
}

// Mock data with varied image heights for masonry effect
const mockOutfits: Outfit[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    username: "fashionista_23",
    likes: 234,
    isLiked: false,
    style: "Casual",
    season: "Spring",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
    username: "style_maven",
    likes: 456,
    isLiked: false,
    style: "Elegant",
    season: "Summer",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80",
    username: "outfit_guru",
    likes: 567,
    isLiked: false,
    style: "Street",
    season: "Fall",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
    username: "wardrobe_wizard",
    likes: 123,
    isLiked: false,
    style: "Boho",
    season: "Spring",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80",
    username: "chic_creator",
    likes: 789,
    isLiked: false,
    style: "Classic",
    season: "Winter",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80",
    username: "trend_setter",
    likes: 345,
    isLiked: false,
    style: "Casual",
    season: "Summer",
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=600&q=80",
    username: "fashion_forward",
    likes: 678,
    isLiked: false,
    style: "Elegant",
    season: "Fall",
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
    username: "style_icon",
    likes: 891,
    isLiked: false,
    style: "Street",
    season: "Spring",
  },
  {
    id: "9",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80",
    username: "closet_queen",
    likes: 234,
    isLiked: false,
    style: "Boho",
    season: "Summer",
  },
];

export function ExplorePage() {
  const { theme } = useTheme();
  const [outfits, setOutfits] = useState(mockOutfits);
  const [styleFilter, setStyleFilter] = useState("All Styles");
  const [seasonFilter, setSeasonFilter] = useState("All Seasons");

  const toggleLike = (id: string) => {
    setOutfits(
      outfits.map((outfit) =>
        outfit.id === id
          ? {
              ...outfit,
              isLiked: !outfit.isLiked,
              likes: outfit.isLiked ? outfit.likes - 1 : outfit.likes + 1,
            }
          : outfit,
      ),
    );
  };

  const loadMore = () => {
    // Simulate loading more outfits
    console.log("Loading more outfits...");
  };

  const styles = ["All Styles", "Casual", "Elegant", "Street", "Boho", "Classic"];
  const seasons = ["All Seasons", "Spring", "Summer", "Fall", "Winter"];

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        // #1a1a1a / #FAF1ED -> var(--outfitly-bg-primary) (theme handled in CSS)
        backgroundColor: "var(--outfitly-bg-primary)",
      }}
    >
      <Navbar />

      <main className="pt-20 pb-16">
        {/* Page Header */}
        <PageHeader
          title="Explore Outfits"
          subtitle="Discover inspiring looks from the community"
        />

        <div className="container mx-auto px-4 max-w-7xl mt-12">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div
              className="p-6 rounded-2xl border-2 shadow-lg transition-all duration-300"
              style={{
                // #2a2a2a / #FFFFFF -> var(--outfitly-bg-secondary) / var(--outfitly-bg-white)
                backgroundColor:
                  theme === "dark" ? "var(--outfitly-bg-secondary)" : "var(--outfitly-bg-white)",
                // #671425 / #F2E8E3 -> primary / bg-secondary
                borderColor:
                  theme === "dark" ? "var(--outfitly-primary)" : "var(--outfitly-bg-secondary)",
              }}
            >
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
                    // #671425
                    style={{ backgroundColor: "var(--outfitly-primary)" }}
                  >
                    <Filter
                      className="w-5 h-5"
                      // #FAF1ED
                      style={{ color: "var(--outfitly-text-light)" }}
                    />
                  </div>
                  <span
                    className="transition-colors duration-300"
                    style={{
                      color:
                        theme === "dark" ? "var(--outfitly-text-light)" : "var(--outfitly-primary)",
                    }}
                  >
                    Filter by:
                  </span>
                </div>

                {/* Style Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="transition-all duration-300 border-2 hover:scale-105"
                      style={{
                        // #1a1a1a / #F2E8E3
                        backgroundColor:
                          theme === "dark"
                            ? "var(--outfitly-bg-primary)"
                            : "var(--outfitly-bg-secondary)",
                        // #671425
                        borderColor: "var(--outfitly-primary)",
                        // #FAF1ED / #671425
                        color:
                          theme === "dark"
                            ? "var(--outfitly-text-light)"
                            : "var(--outfitly-primary)",
                      }}
                    >
                      {styleFilter}
                      <ChevronDown className="ml-2 w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="border-2"
                    style={{
                      // #2a2a2a / #FFFFFF
                      backgroundColor:
                        theme === "dark"
                          ? "var(--outfitly-bg-secondary)"
                          : "var(--outfitly-bg-white)",
                      // #671425
                      borderColor: "var(--outfitly-primary)",
                    }}
                  >
                    {styles.map((style) => (
                      <DropdownMenuItem
                        key={style}
                        onClick={() => setStyleFilter(style)}
                        style={{
                          // #FAF1ED / #671425
                          color:
                            theme === "dark"
                              ? "var(--outfitly-text-light)"
                              : "var(--outfitly-primary)",
                        }}
                        // hover:bg-[#671425]/10 -> still using primary; if you want full variable,
                        // you can define a soft token like --outfitly-primary-soft and use it here.
                        className="cursor-pointer hover:bg-[#671425]/10"
                      >
                        {style}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Season Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="transition-all duration-300 border-2 hover:scale-105"
                      style={{
                        backgroundColor:
                          theme === "dark"
                            ? "var(--outfitly-bg-primary)"
                            : "var(--outfitly-bg-secondary)",
                        borderColor: "var(--outfitly-primary)",
                        color:
                          theme === "dark"
                            ? "var(--outfitly-text-light)"
                            : "var(--outfitly-primary)",
                      }}
                    >
                      {seasonFilter}
                      <ChevronDown className="ml-2 w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="border-2"
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? "var(--outfitly-bg-secondary)"
                          : "var(--outfitly-bg-white)",
                      borderColor: "var(--outfitly-primary)",
                    }}
                  >
                    {seasons.map((season) => (
                      <DropdownMenuItem
                        key={season}
                        onClick={() => setSeasonFilter(season)}
                        style={{
                          color:
                            theme === "dark"
                              ? "var(--outfitly-text-light)"
                              : "var(--outfitly-primary)",
                        }}
                        className="cursor-pointer hover:bg-[#671425]/10"
                      >
                        {season}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </motion.div>

          {/* Masonry Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}>
              <Masonry gutter="1.5rem">
                {outfits.map((outfit, index) => (
                  <motion.div
                    key={outfit.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group relative overflow-hidden rounded-xl border-2 transition-all duration-300 shadow-lg hover:shadow-2xl"
                    style={{
                      // #671425 / #F2E8E3
                      borderColor:
                        theme === "dark"
                          ? "var(--outfitly-primary)"
                          : "var(--outfitly-bg-secondary)",
                      // #2a2a2a / #FFFFFF
                      backgroundColor:
                        theme === "dark"
                          ? "var(--outfitly-bg-secondary)"
                          : "var(--outfitly-bg-white)",
                    }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={outfit.image}
                        alt={`Outfit by ${outfit.username}`}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Gradient Overlay (kept as black overlay, not brand gradient) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Like Button Overlay */}
                      <motion.button
                        onClick={() => toggleLike(outfit.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 border-2"
                        style={{
                          backgroundColor: outfit.isLiked
                            ? "var(--outfitly-primary)" // #671425
                            : "rgba(255, 255, 255, 0.2)",
                          borderColor: outfit.isLiked
                            ? "var(--outfitly-primary)" // #671425
                            : "var(--outfitly-bg-white)", // #FFFFFF
                        }}
                      >
                        <Heart
                          className={`w-5 h-5 transition-all duration-300 ${
                            outfit.isLiked ? "fill-current" : ""
                          }`}
                          style={{
                            color: outfit.isLiked
                              ? "var(--outfitly-text-light)" // #FAF1ED
                              : "var(--outfitly-bg-white)", // #FFFFFF
                          }}
                        />
                      </motion.button>
                    </div>

                    {/* Info Section */}
                    <div
                      className="p-4 transition-colors duration-300"
                      style={{
                        backgroundColor:
                          theme === "dark"
                            ? "var(--outfitly-bg-secondary)"
                            : "var(--outfitly-bg-white)",
                      }}
                    >
                      {/* Username */}
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "var(--outfitly-primary)" }} // #671425
                        >
                          <User
                            className="w-4 h-4"
                            style={{ color: "var(--outfitly-text-light)" }} // #FAF1ED
                          />
                        </div>
                        <span
                          className="transition-colors duration-300"
                          style={{
                            color:
                              theme === "dark"
                                ? "var(--outfitly-text-light)"
                                : "var(--outfitly-primary)",
                          }}
                        >
                          @{outfit.username}
                        </span>
                      </div>

                      {/* Like Count */}
                      <div className="flex items-center gap-2">
                        <Heart
                          className={`w-4 h-4 ${outfit.isLiked ? "fill-current" : ""}`}
                          style={{
                            color: outfit.isLiked
                              ? "var(--outfitly-primary)" // #671425
                              : theme === "dark"
                                ? "var(--outfitly-text-light)" // #FAF1ED
                                : "var(--outfitly-primary)", // #671425
                          }}
                        />
                        <span
                          className="text-sm transition-colors duration-300"
                          style={{
                            // #4C1420
                            color:
                              theme === "dark"
                                ? "var(--outfitly-text-light)"
                                : "var(--outfitly-text-primary)",
                          }}
                        >
                          {outfit.likes.toLocaleString()}
                        </span>
                      </div>

                      {/* Decorative Gradient Line */}
                      <motion.div
                        className="mt-3 h-0.5 bg-gradient-to-r from-[var(--outfitly-gradient-start)] via-[var(--outfitly-gradient-mid)] to-[var(--outfitly-gradient-end)] rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </motion.div>

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex justify-center"
          >
            <motion.button
              onClick={loadMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl"
              style={{
                backgroundColor: "var(--outfitly-primary)", // #671425
                color: "var(--outfitly-text-light)", // #FAF1ED
              }}
            >
              <span className="text-lg">Load More</span>
            </motion.button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
