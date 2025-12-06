"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bell, Sun, Moon, Menu, X } from "lucide-react";

import { Button } from "../ui/button";
import { Logo } from "../logo/logo";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavbar } from "./useNavbar";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isOpen, toggleMenu, closeMenu, isActive, NAV_LINKS, NAVBAR_COLORS } = useNavbar();

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
            <Logo size="md" animated={false} linkTo="/" />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-8">
              {NAV_LINKS.map((link) => (
                <Link key={link.label} href={link.href}>
                  <motion.span
                    whileHover={{ y: -2 }}
                    className={`opacity-80 hover:opacity-100 transition-all duration-300 ${
                      isActive(link.href) ? "font-semibold opacity-100" : ""
                    }`}
                    style={{ color: NAVBAR_COLORS.link }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/notifications">
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

              <Button
                variant="ghost"
                onClick={toggleTheme}
                className="hover:bg-transparent p-2"
                style={{ color: NAVBAR_COLORS.primary }}
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              <Link href="/login">
                <Button
                  variant="ghost"
                  className="hover:bg-transparent"
                  style={{ color: NAVBAR_COLORS.primary }}
                >
                  Sign In
                </Button>
              </Link>

              <Link href="/login">
                <Button
                  className="hover:scale-105 hover:shadow-lg transition-all"
                  style={{
                    backgroundColor: NAVBAR_COLORS.primary,
                    color: NAVBAR_COLORS.textLight,
                  }}
                >
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Icons */}
            <div className="lg:hidden flex items-center gap-2">
              <Link href="/notifications" className="relative p-2">
                <Bell className="w-5 h-5" style={{ color: NAVBAR_COLORS.link }} />
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center"
                  style={{
                    background: NAVBAR_COLORS.gradientMid,
                    color: NAVBAR_COLORS.textLight,
                    fontWeight: "700",
                    fontSize: "9px",
                  }}
                >
                  3
                </span>
              </Link>

              <button onClick={toggleTheme} className="p-2">
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" style={{ color: NAVBAR_COLORS.primary }} />
                ) : (
                  <Moon className="w-5 h-5" style={{ color: NAVBAR_COLORS.primary }} />
                )}
              </button>

              <button onClick={toggleMenu} className="p-2">
                {isOpen ? (
                  <X className="w-6 h-6" style={{ color: NAVBAR_COLORS.primary }} />
                ) : (
                  <Menu className="w-6 h-6" style={{ color: NAVBAR_COLORS.primary }} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          <motion.div
            initial={false}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="pt-6 pb-2 space-y-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className={`block py-2 transition-opacity duration-300 ${
                    isActive(link.href) ? "opacity-100" : "opacity-80 hover:opacity-100"
                  }`}
                  style={{ color: NAVBAR_COLORS.link }}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 space-y-3">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="w-full"
                    style={{ color: NAVBAR_COLORS.primary }}
                  >
                    Sign In
                  </Button>
                </Link>

                <Link href="/login">
                  <Button
                    className="w-full"
                    style={{
                      backgroundColor: NAVBAR_COLORS.primary,
                      color: NAVBAR_COLORS.textLight,
                    }}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
