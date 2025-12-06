"use client";

import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import { NAV_LINKS, NAVBAR_COLORS } from "./navbar.constants";

export function useNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  const isActive = useCallback((href: string) => pathname === href, [pathname]);

  return {
    isOpen,
    toggleMenu,
    closeMenu,
    isActive,
    NAV_LINKS,
    NAVBAR_COLORS,
  };
}
