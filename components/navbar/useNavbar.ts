"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useCallback, useMemo } from "react";
import { NAVBAR_COLORS } from "./navbar.constants";
import { useAuth } from "@/providers/auth/auth.provider";
import { useTheme } from "next-themes";
import { logOutAction } from "@/modules/auth/auth.actions";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function useNavbar() {
  const pathname = usePathname();
  const { user, authStatus, applySignedOut } = useAuth();
  console.log(user);
  const nav = useRouter();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const t = useTranslations("Navigation");

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
    const navLinks = [
      { label: t("home"), href: "/" },
      { label: t("wardrobe"), href: "/my-wardrobe" },
      { label: t("aiGenerator"), href: "/AI-generator" },
      { label: t("weather"), href: "/weather" },
      { label: t("explore"), href: "/explore" },
      { label: t("profile"), href: "/profile" },
    ];
    if (isAdmin) {
      navLinks.push({ label: t("dashboard"), href: "/dashboard" });
    }
    return navLinks;
  }, [isAdmin, t]);

  const onLogout = async () => {
    const res = await logOutAction();
    if (!res.success) {
      toast.error(t("logoutFailed"));
    }
    applySignedOut();
    nav.push("/sign-in");
    setIsUserMenuOpen(false);
    closeMenu();
  };

  const onToggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  return {
    isOpen,
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
    onLogout,
    setIsUserMenuOpen,
    onToggleTheme,
    toggleMenu,
    closeMenu,
    isActive,
  };
}
