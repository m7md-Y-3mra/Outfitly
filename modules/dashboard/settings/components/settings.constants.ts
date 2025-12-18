import { Globe, Shield, Mail, Lock } from "lucide-react";

export const GENERAL_SETTINGS = [
    {
        id: "publicRegistration",
        title: "Public Registration",
        subtitle: "Allow new users to register",
        icon: Globe,
        defaultValue: false,
    },
    {
        id: "contentModeration",
        title: "Content Moderation",
        subtitle: "Enable automatic content moderation",
        icon: Shield,
        defaultValue: true,
    },
    {
        id: "emailNotifications",
        title: "Email Notifications",
        subtitle: "Send email notifications to admins",
        icon: Mail,
        defaultValue: true,
    },
    {
        id: "maintenanceMode",
        title: "Maintenance Mode",
        subtitle: "Put the site in maintenance mode",
        icon: Lock,
        defaultValue: false,
    },
];
