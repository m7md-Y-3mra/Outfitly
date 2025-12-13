"use client";
import { motion } from "framer-motion";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { Footer } from "@/components/footer";
import useExplore from "@/modules/explore/hook/useExplore";
import { OutfitCard } from "./outfitCard";
import Filters from "./filters";
import InfinteScroll from "./infinteScroll";

export default function ExplorePage() {
  const {
    outfits,
    loading,
    hasMore,
    loaderRef,
    seasonFilter,
    styleFilter,
    setSeasonFilter,
    setStyleFilter,
    dispatch,
  } = useExplore();

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: "var(--outfitly-bg-primary)",
      }}
    >
      <Navbar />

      <main className="pt-20 pb-16">
        <PageHeader
          title="Explore Outfits"
          subtitle="Discover inspiring looks from the community"
        />

        <div className="container mx-auto px-4 max-w-7xl mt-12">
          <Filters
            seasonFilter={seasonFilter}
            setSeasonFilter={setSeasonFilter}
            styleFilter={styleFilter}
            setStyleFilter={setStyleFilter}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}>
              <Masonry gutter="1.5rem">
                {outfits.map((outfit, index) => (
                  <OutfitCard key={index} index={index} outfit={outfit} dispatch={dispatch} />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </motion.div>

          <InfinteScroll hasMore={hasMore} loaderRef={loaderRef} loading={loading} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
