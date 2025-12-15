"use client";

import { useState, useEffect } from "react";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import AdminSidebar from "@/components/admin/sidebar/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initialize sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    // Optional: Listen for resize if dynamic behavior is desired,
    // but typically per-session init is enough or user controlled thereafter.
    // We'll leave it user-controlled after init to avoid annoying auto-closing/opening on resize boundaries while working.
  }, []);

  return (
    <div className="min-h-screen bg-muted/40 relative selection:bg-primary/10">
      {/* Background effects can go here */}

      <AdminNavbar
        isSidebarOpen={isSidebarOpen}
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 w-full min-h-screen transition-all duration-300">
          <div className="p-6 md:p-8 pt-[100px] md:pt-[100px] min-h-[calc(100vh-2rem)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
