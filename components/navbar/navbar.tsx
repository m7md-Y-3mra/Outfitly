"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Sun, Moon, Menu, X, ChevronDown, ShieldAlert } from "lucide-react";
import { Button } from "../ui/button";
import { Logo } from "../logo/logo";
import { useNavbar } from "./useNavbar";

import CustomButton from "../custom-button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MiniLoader } from "./miniLoader";

export function Navbar() {
  const {
    isOpen,
    iconColor,
    NAVBAR_COLORS,
    isLoggedIn,
    finalLinks,
    initials,
    isUserMenuOpen,
    isAdmin,
    user,
    theme,
    authStatus,
    setIsUserMenuOpen,
    onToggleTheme,
    toggleMenu,
    closeMenu,
    isActive,
  } = useNavbar();

  const isAuthLoading = authStatus === "loading";

  const onLogout = async () => {
    // ✅ plug your logout logic
    // await logout()
    setIsUserMenuOpen(false);
    closeMenu();
  };

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
          className="rounded-2xl shadow-lg backdrop-blur-md px-6 py-4 transition-colors duration-300"
          style={{
            backgroundColor: NAVBAR_COLORS.bgPrimary,
            border: `1px solid ${NAVBAR_COLORS.borderMedium}`,
          }}
        >
          <div className="flex items-center justify-between">
            <Logo size="md" animated={false} linkTo="/" />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-8">
              {finalLinks.map((link) => (
                <Link key={link.label} href={link.href} prefetch={false}>
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
              {isAdmin && !isAuthLoading && (
                <Link href="/admin/issues">
                  <Button
                    variant="ghost"
                    className="hover:bg-transparent p-2 relative group"
                    style={{ color: iconColor }}
                    aria-label="Admin Issues"
                  >
                    <ShieldAlert className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
                  </Button>
                </Link>
              )}

              <CustomButton
                variant="ghost"
                onClick={onToggleTheme}
                className="hover:bg-transparent p-2"
                style={{ color: iconColor }}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" style={{ color: iconColor }} />
                ) : (
                  <Moon className="w-5 h-5" style={{ color: iconColor }} />
                )}
              </CustomButton>

              {isAuthLoading ? (
                <MiniLoader color={NAVBAR_COLORS.link} />
              ) : !isLoggedIn ? (
                <>
                  <Link href="/sign-in">
                    <Button
                      variant="ghost"
                      className="hover:bg-transparent"
                      style={{ color: iconColor }}
                    >
                      Sign In
                    </Button>
                  </Link>

                  <Link href="/sign-up">
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
                </>
              ) : (
                <div className="relative">
                  <button
                    type="button"
                    disabled={isAuthLoading}
                    onClick={() => setIsUserMenuOpen((v) => !v)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, var(--outfitly-primary) 6%, transparent)",
                      border: `1px solid ${NAVBAR_COLORS.borderMedium}`,
                    }}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback
                        style={{
                          backgroundColor: NAVBAR_COLORS.primary,
                          color: NAVBAR_COLORS.textLight,
                        }}
                      >
                        {initials}
                      </AvatarFallback>
                    </Avatar>

                    <span className="max-w-[120px] truncate" style={{ color: NAVBAR_COLORS.link }}>
                      {user?.fullName || user?.email}
                    </span>

                    <ChevronDown
                      className="w-4 h-4 opacity-80"
                      style={{ color: NAVBAR_COLORS.link }}
                    />
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        className="absolute right-0 mt-3 w-56 rounded-2xl shadow-xl overflow-hidden z-50"
                        style={{
                          backgroundColor: NAVBAR_COLORS.bgPrimary,
                          border: `1px solid ${NAVBAR_COLORS.borderMedium}`,
                        }}
                      >
                        <div className="px-4 py-3">
                          <p className="text-sm font-medium" style={{ color: NAVBAR_COLORS.link }}>
                            {user?.fullName || "User"}
                          </p>
                          <p
                            className="text-xs opacity-70 truncate"
                            style={{ color: NAVBAR_COLORS.link }}
                          >
                            {user?.email}
                          </p>
                        </div>

                        <div
                          className="h-px"
                          style={{ backgroundColor: NAVBAR_COLORS.borderMedium }}
                        />

                        <div className="p-2">
                          <Link
                            href="/profile"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="block px-3 py-2 rounded-xl text-sm transition-colors"
                            style={{ color: NAVBAR_COLORS.link }}
                          >
                            Profile
                          </Link>

                          {isAdmin && (
                            <Link
                              href="/dashboard"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="block px-3 py-2 rounded-xl text-sm transition-colors"
                              style={{ color: NAVBAR_COLORS.link }}
                            >
                              Dashboard
                            </Link>
                          )}

                          <button
                            type="button"
                            onClick={onLogout}
                            className="w-full text-left px-3 py-2 rounded-xl text-sm transition-colors"
                            style={{ color: NAVBAR_COLORS.link }}
                          >
                            Sign out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Mobile Icons */}
            <div className="lg:hidden flex items-center gap-2">
              <CustomButton onClick={onToggleTheme} className="p-2" style={{ color: iconColor }}>
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" style={{ color: iconColor }} />
                ) : (
                  <Moon className="w-5 h-5" style={{ color: iconColor }} />
                )}
              </CustomButton>

              <CustomButton onClick={toggleMenu} className="p-2" style={{ color: iconColor }}>
                {isOpen ? (
                  <X className="w-6 h-6" style={{ color: iconColor }} />
                ) : (
                  <Menu className="w-6 h-6" style={{ color: iconColor }} />
                )}
              </CustomButton>
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
              {finalLinks.map((link) => (
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
                {isAuthLoading ? (
                  <div
                    className="p-3 rounded-2xl"
                    style={{
                      border: `1px solid ${NAVBAR_COLORS.borderMedium}`,
                      backgroundColor:
                        "color-mix(in srgb, var(--outfitly-primary) 5%, transparent)",
                    }}
                  >
                    <MiniLoader color={NAVBAR_COLORS.link} />
                  </div>
                ) : !isLoggedIn ? (
                  <>
                    <Link href="/sign-in" onClick={closeMenu}>
                      <Button
                        variant="ghost"
                        className="w-full"
                        style={{ color: NAVBAR_COLORS.primary }}
                      >
                        Sign In
                      </Button>
                    </Link>

                    <Link href="/sign-up" onClick={closeMenu}>
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
                  </>
                ) : (
                  <div
                    className="p-3 rounded-2xl space-y-3"
                    style={{
                      border: `1px solid ${NAVBAR_COLORS.borderMedium}`,
                      backgroundColor:
                        "color-mix(in srgb, var(--outfitly-primary) 5%, transparent)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user?.avatarUrl ?? ""} alt={user?.fullName ?? "User"} />
                        <AvatarFallback
                          style={{
                            backgroundColor: NAVBAR_COLORS.primary,
                            color: NAVBAR_COLORS.textLight,
                          }}
                        >
                          {initials}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0 flex-1">
                        <p
                          className="truncate text-sm font-medium"
                          style={{ color: NAVBAR_COLORS.link }}
                        >
                          {user?.fullName || "User"}
                        </p>
                        <p
                          className="truncate text-xs opacity-70"
                          style={{ color: NAVBAR_COLORS.link }}
                        >
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Link href="/profile" onClick={closeMenu}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          style={{ color: NAVBAR_COLORS.link }}
                        >
                          Profile
                        </Button>
                      </Link>

                      {isAdmin && (
                        <Link href="/dashboard" onClick={closeMenu}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            style={{ color: NAVBAR_COLORS.link }}
                          >
                            Dashboard
                          </Button>
                        </Link>
                      )}

                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        style={{ color: NAVBAR_COLORS.link }}
                        onClick={onLogout}
                      >
                        Sign out
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
