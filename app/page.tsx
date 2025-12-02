import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
{/*Button usage Examples 
  
  
  
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

  
  */}