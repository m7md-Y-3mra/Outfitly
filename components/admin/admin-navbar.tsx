"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bell, Sun, Moon, Menu, X, Search } from "lucide-react";

import { Button } from "../ui/button";
import { Logo } from "../logo/logo";
import { useTheme } from "next-themes";
import CustomButton from "../custom-button";
import { NAVBAR_COLORS } from "../navbar/navbar.constants";

export function AdminNavbar({
  isSidebarOpen,
  onMenuClick,
}: {
  isSidebarOpen: boolean;
  onMenuClick: () => void;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="fixed top-0 left-0 right-0 px-6 py-4 z-50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          layout
          className="rounded-2xl shadow-lg backdrop-blur-md px-6 py-4 transition-colors duration-300 overflow-hidden"
          style={{
            backgroundColor: NAVBAR_COLORS.bgPrimary,
            border: `1px solid ${NAVBAR_COLORS.borderMedium}`,
          }}
        >
          <div className="flex items-center justify-between">
            {/* Left Section: Burger, Logo, Badge */}
            <div className="flex items-center gap-4">
              <CustomButton
                onClick={onMenuClick}
                className="p-2! hover:bg-transparent"
                style={{ color: NAVBAR_COLORS.primary }}
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </CustomButton>

              <div className="flex items-center gap-3">
                <Logo size="md" animated={false} linkTo="/dashboard" />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wider border border-primary/20">
                  Admin
                </span>
              </div>
            </div>

            {/* Right Section: Theme -> Notifications -> Search */}
            <div className="flex items-center gap-2">
              {/* 3. Search */}
              <div className="relative w-full max-w-[240px] hidden md:block group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search
                    className="h-4 w-4 opacity-50 group-focus-within:opacity-100 transition-opacity"
                    style={{ color: NAVBAR_COLORS.primary }}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-transparent pl-10 pr-4 py-2 text-sm rounded-xl focus:outline-none transition-all placeholder:text-muted-foreground/50"
                  style={{
                    border: `1px solid ${NAVBAR_COLORS.borderMedium}`,
                    color: NAVBAR_COLORS.primary,
                  }}
                />
              </div>

              {/* 2. Notifications */}
              <Link href="/notifications" className="hidden sm:block">
                <Button
                  variant="ghost"
                  className="hover:bg-transparent p-2 relative"
                  style={{ color: NAVBAR_COLORS.primary }}
                >
                  <Bell className="w-5 h-5" />
                  <span
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center"
                    style={{
                      background: NAVBAR_COLORS.gradientMid,
                      color: NAVBAR_COLORS.textLight,
                      fontWeight: "700",
                      fontSize: "10px",
                    }}
                  >
                    3
                  </span>
                </Button>
              </Link>

              {/* 1. Theme Toggle */}
              <CustomButton
                variant="ghost"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover:bg-transparent p-2 hidden sm:flex"
                style={{ color: NAVBAR_COLORS.primary }}
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </CustomButton>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
