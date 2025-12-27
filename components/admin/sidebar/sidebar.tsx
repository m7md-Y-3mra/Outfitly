"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Shirt, Settings, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAVBAR_COLORS } from "../../navbar/navbar.constants";
import { useTranslations } from "next-intl";

export function AdminSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const t = useTranslations("Admin");

  const sidebarItems = [
    {
      icon: LayoutDashboard,
      label: t("sidebar.dashboard"),
      href: "/dashboard",
    },
    {
      icon: Users,
      label: t("sidebar.users"),
      href: "/dashboard/users",
    },
    {
      icon: Shirt,
      label: t("sidebar.outfits"),
      href: "/dashboard/outfits",
    },
    // {
    //   icon: Settings,
    //   label: t("sidebar.settings"),
    //   href: "/dashboard/settings",
    // },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity duration-300 backdrop-blur-sm",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed md:sticky top-32 left-0 z-40 h-[calc(100vh-9rem)] transition-all duration-500 ease-in-out mb-6 overflow-hidden",
          isOpen
            ? "translate-x-6 md:translate-x-0 w-[260px] opacity-100"
            : "-translate-x-full w-0 md:ml-0 opacity-0 md:opacity-0",
        )}
        style={{
          width: isOpen ? "260px" : "0px",
        }}
      >
        <div
          className="h-full w-[260px] flex flex-col justify-between rounded-2xl overflow-hidden shadow-lg border backdrop-blur-xl"
          style={{
            backgroundColor: "var(--card)",
            borderColor: NAVBAR_COLORS.borderMedium,
          }}
        >
          {/* Navigation Items */}
          <div className="p-4 flex flex-col gap-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);

              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                      isActive
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5",
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary/10 border-l-2 border-primary"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <Icon className={cn("w-5 h-5 z-10", isActive && "text-primary")} />
                    <span className="z-10">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Pro Admin Card */}
          <div className="p-4 mt-auto">
            <div className="relative rounded-2xl p-5 overflow-hidden group cursor-pointer">
              {/* Gradient Background */}
              <div
                className="absolute inset-0 opacity-90 group-hover:opacity-100 transition-opacity"
                style={{ background: NAVBAR_COLORS.gradientMid }}
              />

              <div className="relative z-10 flex flex-col gap-3">
                <div className="p-2 bg-white/20 w-fit rounded-lg backdrop-blur-sm border border-white/10">
                  <Sparkles className="w-5 h-5" style={{ color: NAVBAR_COLORS.textLight }} />
                </div>

                <div className="space-y-1">
                  <h3 className="text-white font-bold text-lg tracking-tight">
                    {t("proCard.title")}
                  </h3>
                  <p className="text-indigo-100 text-xs font-medium leading-relaxed">
                    {t("proCard.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
