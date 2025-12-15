
import { LayoutDashboard, Users, Shirt, Settings } from "lucide-react";

export const SIDEBAR_ITEMS = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        href: "/dashboard",
    },
    {
        icon: Users,
        label: "Users",
        href: "/dashboard/users",
    },
    {
        icon: Shirt,
        label: "Outfits",
        href: "/dashboard/outfits",
    },
    {
        icon: Settings,
        label: "Settings",
        href: "/dashboard/settings",
    },
];