"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Sun, Moon, Menu, X } from "lucide-react";

import { Button } from "../ui/button";
import { Logo } from "../logo/logo";
import { useTheme } from "../../contexts/ThemeContext";
import { NAV_LINKS, NAVBAR_COLORS } from "./navbar.constants";
import { useNavbar } from "./useNavbar";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const { isOpen, toggleMenu, closeMenu } = useNavbar();

  const linkColor = NAVBAR_COLORS.link;
  const bgPrimary = NAVBAR_COLORS.bgPrimary;
  const bgSecondary = NAVBAR_COLORS.bgSecondary;
  const borderColor = theme === "dark" ? NAVBAR_COLORS.borderMedium : NAVBAR_COLORS.borderLight;
  const primaryColor = NAVBAR_COLORS.primary;
  const primaryHover = NAVBAR_COLORS.primaryHover;
  const primaryText = NAVBAR_COLORS.textLight;
  const gradientStart = NAVBAR_COLORS.gradientStart;
  const gradientMid = NAVBAR_COLORS.gradientMid;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-2xl px-6 py-4 shadow-lg backdrop-blur-md transition-colors duration-300 flex items-center justify-between"
          style={{
            backgroundColor: bgPrimary,
            border: `1px solid ${borderColor}`,
          }}
        >
          <Logo size="lg" animated={false} linkTo="/" />

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.label} href={link.href}>
                  <motion.span
                    className={`relative transition-all duration-300 ${isActive ? "opacity-100 font-semibold" : "opacity-80"} hover:opacity-100`}
                    style={{ color: linkColor }}
                    whileHover={{ y: -2 }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/notifications">
              <Button
                variant="ghost"
                className="hover:bg-transparent p-2 relative"
                style={{ color: primaryColor }}
              >
                <Bell className="w-5 h-5" />
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientMid} 100%)`,
                    color: primaryText,
                    fontSize: "10px",
                    fontWeight: "700",
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
              style={{ color: primaryColor }}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            <Link href="/login">
              <Button
                variant="ghost"
                className="hover:bg-transparent transition-colors duration-300"
                style={{ color: primaryColor }}
              >
                Sign In
              </Button>
            </Link>

            <Link href="/login">
              <Button
                className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: primaryColor, color: primaryText }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = primaryHover)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = primaryColor)}
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <Link href="/notifications" className="p-2 relative">
              <Bell className="w-5 h-5" style={{ color: linkColor }} />
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientMid} 100%)`,
                  color: primaryText,
                  fontSize: "9px",
                  fontWeight: "700",
                }}
              >
                3
              </span>
            </Link>
            <button onClick={toggleTheme} className="p-2" aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={toggleMenu} className="p-2" aria-label="Toggle menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pt-6 pb-2 space-y-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`block py-2 transition-all duration-300 ${isActive ? "opacity-100 font-semibold" : "opacity-80 hover:opacity-100"}`}
                  onClick={closeMenu}
                  style={{ color: linkColor }}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-4 space-y-3">
              <Button
                variant="ghost"
                className="w-full transition-colors duration-300"
                style={{ color: primaryText }}
              >
                Sign In
              </Button>
              <Button
                className="w-full"
                style={{ backgroundColor: primaryColor, color: primaryText }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
