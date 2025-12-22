"use client";

import { usePathname } from "next/navigation";
import { useState, useCallback, useMemo } from "react";
import { NAV_LINKS, NAVBAR_COLORS } from "./navbar.constants";
import { useAuth } from "@/providers/auth/auth.provider";
import { useTheme } from "next-themes";

export function useNavbar() {
  const pathname = usePathname();
  const { user, authStatus } = useAuth();
  console.log(user);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const isActive = useCallback((href: string) => pathname === href, [pathname]);

  const isLoggedIn = Boolean(user);
  const role = user?.role ?? "USER";
  const isAdmin = role === "ADMIN";

  const iconColor = "var(--outfitly-text-primary)";

  const initials = useMemo(() => {
    const name = user?.fullName?.trim() || user?.email?.split("@")[0] || "U";
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("");
  }, [user]);

  const finalLinks = useMemo(() => {
    const base = [...NAV_LINKS];
    if (isAdmin && !base.some((l) => l.href === "/dashboard")) {
      base.push({ label: "Dashboard", href: "/dashboard" });
    }
    return base;
  }, [isAdmin]);

  const onToggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  return {
    isOpen,
    NAV_LINKS,
    iconColor,
    NAVBAR_COLORS,
    isLoggedIn,
    finalLinks,
    initials,
    isUserMenuOpen,
    theme,
    isAdmin,
    user,
    authStatus,
    setIsUserMenuOpen,
    onToggleTheme,
    toggleMenu,
    closeMenu,
    isActive,
  };
}
