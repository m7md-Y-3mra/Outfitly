import type { Metadata } from "next";
import { LandingPage } from "@/modules/landing-page";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover your personal style with Outfitly. Organize your wardrobe, explore outfit ideas, and elevate your fashion game.",
};

export default function Home() {
  return (
    <div>
      <LandingPage />
    </div>
  );
}

{
  /*Example usage of using loading props in Button component : 
  
  "use client";
import Image from "next/image";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import type { AppProps } from 'next/app'
import { ThemeProvider } from '../contexts/ThemeContext'
import { Button } from "@/components/Button/Button";
import { useState } from "react";

export default function Home({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false); // Example loading state
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
       <ThemeProvider>
          <Navbar/>
            <Button
              variant="motion"
              loading={isLoading}
              onClick={()=>{setIsLoading(!isLoading)}}
              loadingText="Processing..."
              className="bg-red-100"
            >
              Submit
            </Button>
          <Footer/>     
       </ThemeProvider>

    </div>
  );
}
  
  */
}
{
  /*page-header usage example :
    
  <PageHeader title="s"    backTo="/wardrobe"     subtitle="See and manage all your outfits in one place" 

  
  */
}
{
  /* Button Examples -with variables-
"use client";

import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { ArrowRight, Edit, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// Example Icon & Badge components
const Icon = ({ className }: { className?: string }) => <span className={className}>⭐</span>;

const Badge = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <span
    style={style}
    className="text-xs font-semibold px-2 py-1 rounded-full"
  >
    {children}
  </span>
);

export default function Home() {
  const categories = [
    { value: "clothes", label: "Clothes" },
    { value: "shoes", label: "Shoes" },
    { value: "accessories", label: "Accessories" },
  ];

  const tabs = [
    { id: "home", label: "Home", count: 3 },
    { id: "profile", label: "Profile", count: 5 },
    { id: "settings", label: "Settings", count: 2 },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>("clothes");
  const [activeTab, setActiveTab] = useState<string>("home");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="flex min-h-screen flex-col gap-6 items-center justify-center bg-background font-sans p-6">

        / Theme toggle /
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="px-4 py-2 rounded bg-primary text-primary-foreground"
        >
          Toggle Theme
        </button>

        / Primary Button /
        <Button size="lg" variant="primary" className="group">
          Get Started Free
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>

        / Secondary Button /
        <Button size="lg" variant="secondary">
          Watch Demo
        </Button>

        / Gradient Button /
        <Button size="xl" variant="gradient" className="group relative overflow-hidden">
          <span className="relative z-10">Explore More Styles</span>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(to right, var(--outfitly-gradient-mid), var(--outfitly-gradient-start))`,
            }}
          />
        </Button>

        / Ghost Button with theme-aware color /
        <Button
          variant="ghost"
          className="hover:bg-transparent transition-colors duration-300 text-[var(--outfitly-text-secondary)] dark:text-[var(--outfitly-text-primary)]"
        >
          Sign In
        </Button>

        / Icon Button /
        <Button variant="icon" icon={<Edit className="w-4 h-4" />}>
          Edit
        </Button>

        / Category Buttons /
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant="category"
              selected={selectedCategory === category.value}
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        / Motion Buttons with Icon & Badge /
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                variant="motion"
                onClick={() => setActiveTab(tab.id)}
                className="px-6 py-3 rounded-xl"
                style={{
                  backgroundColor: isActive
                    ? "var(--outfitly-primary)"
                    : theme === "dark"
                      ? "var(--outfitly-bg-secondary)"
                      : "var(--outfitly-bg-secondary)",
                  color: isActive
                    ? "var(--outfitly-primary-foreground)"
                    : theme === "dark"
                      ? "var(--outfitly-text-primary)"
                      : "var(--outfitly-text-secondary)",
                }}
                icon={<Icon className="w-5 h-5" />}
                badge={
                  <Badge
                    style={{
                      backgroundColor: isActive
                        ? "var(--outfitly-gradient-mid)"
                        : theme === "dark"
                          ? "var(--outfitly-bg-secondary)"
                          : "var(--outfitly-bg-white)",
                      color: isActive
                        ? "var(--outfitly-primary-foreground)"
                        : theme === "dark"
                          ? "var(--outfitly-text-primary)"
                          : "var(--outfitly-text-secondary)",
                    }}
                  >
                    {tab.count}
                  </Badge>
                }
              >
                {tab.label}
              </Button>
            );
          })}
        </div>

        / Single Motion Button /
        <Button
          size="md"
          variant="motion"
          icon={<ChevronRight className="w-5 h-5" />}
          style={{
            background: `linear-gradient(135deg, var(--outfitly-primary) 0%, var(--outfitly-gradient-mid) 100%)`,
            color: "var(--outfitly-primary-foreground)",
          }}
        >
          View Outfit
        </Button>

        <Button
          variant="motion"
          className="w-full py-4 rounded-xl relative overflow-hidden group shadow-lg shadow-[var(--outfitly-border-medium)]/30 hover:shadow-xl hover:shadow-[var(--outfitly-border-medium)]/40"
          style={{
            background: `linear-gradient(to right, var(--outfitly-primary), var(--outfitly-gradient-mid))`,
            color: "var(--outfitly-primary-foreground)",
          }}
        >
          <span className="relative z-10">Sign In</span>

          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </Button>

      </div>
    </div>
  );
}
*/
}

{
  /*Button usage Examples -without variables-
  
  
  
  "use client";

import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { ArrowRight, Edit, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// Example Icon & Badge components
const Icon = ({ className }: { className?: string }) => <span className={className}>⭐</span>;

const Badge = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <span
    style={style}
    className="text-xs font-semibold px-2 py-1 rounded-full"
  >
    {children}
  </span>
);

export default function Home() {
  const categories = [
    { value: "clothes", label: "Clothes" },
    { value: "shoes", label: "Shoes" },
    { value: "accessories", label: "Accessories" },
  ];

  const tabs = [
    { id: "home", label: "Home", count: 3 },
    { id: "profile", label: "Profile", count: 5 },
    { id: "settings", label: "Settings", count: 2 },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>("clothes");
  const [activeTab, setActiveTab] = useState<string>("home");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div className="flex min-h-screen flex-col gap-6 items-center justify-center bg-background font-sans p-6">
      
      /// Theme toggle 
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="px-4 py-2 rounded bg-primary text-primary-foreground"
      >
        Toggle Theme
      </button>

      /Primary Button /
      <Button size="lg" variant="primary" className="group">
        Get Started Free
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>

      / Secondary Button /
      <Button size="lg" variant="secondary">
        Watch Demo
      </Button>

      / Gradient Button /
      <Button size="xl" variant="gradient" className="group relative overflow-hidden">
        <span className="relative z-10">Explore More Styles</span>
        <div className="absolute inset-0 bg-gradient-to-r from-[#6A1526] to-[#671425] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Button>

      / Ghost Button with theme-aware color /
      <Button
        variant="ghost"
        className="hover:bg-transparent transition-colors duration-300"
        style={{ color: theme === "dark" ? "#FAF1ED" : "#671425" }}
      >
        Sign In
      </Button>

      /Icon Button /
      <Button variant="icon" icon={<Edit className="w-4 h-4" />}>
        Edit
      </Button>

      / Category Buttons /
      <div className="flex gap-2">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant="category"
            selected={selectedCategory === category.value}
            onClick={() => setSelectedCategory(category.value)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      / Motion Buttons with Icon & Badge /
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Button
              key={tab.id}
              variant="motion"
              onClick={() => setActiveTab(tab.id)}
              className="px-6 py-3 rounded-xl"
              style={{
                backgroundColor: isActive
                  ? "#671425"
                  : theme === "dark"
                  ? "#1a1a1a"
                  : "#F2E8E3",
                color: isActive
                  ? "#FAF1ED"
                  : theme === "dark"
                  ? "#FAF1ED"
                  : "#671425",
              }}
              icon={<Icon className="w-5 h-5" />}
              badge={
                <Badge
                  style={{
                    backgroundColor: isActive
                      ? "#8B1D35"
                      : theme === "dark"
                      ? "#2A2A30"
                      : "#FFFFFF",
                    color: isActive
                      ? "#FAF1ED"
                      : theme === "dark"
                      ? "#FAF1ED"
                      : "#671425",
                  }}
                >
                  {tab.count}
                </Badge>
              }
            >
              {tab.label}
            </Button>
          );
        })}
      </div>

      / Single Motion Button /
      <Button
        size="md"
        variant="motion"
        icon={<ChevronRight className="w-5 h-5" />}
        style={{
          background: "linear-gradient(135deg, #671425 0%, #8B1D35 100%)",
          color: "#FAF1ED",
        }}
      >
        View Outfit
      </Button>

      <Button
  variant="motion"
  className="w-full py-4 rounded-xl relative overflow-hidden group shadow-lg shadow-[#671425]/30 hover:shadow-xl hover:shadow-[#671425]/40"
  style={{
    background: "linear-gradient(to right, #671425, #8B1D35)",
    color: "#FAF1ED",
  }}
>
  <span className="relative z-10">Sign In</span>

  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
    initial={{ x: "-100%" }}
    whileHover={{ x: "100%" }}
    transition={{ duration: 0.6 }}
  />
</Button>

    </div>
  );
}

  
  */
}
