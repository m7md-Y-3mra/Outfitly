"use client";
import React from "react";
import { motion } from "framer-motion";
import { Shirt, Clock, Heart } from "lucide-react";
import { NAVBAR_COLORS } from "@/components/navbar/navbar.constants";

const StatCard = ({
    title,
    value,
    icon: Icon,
    iconColor,
    iconBg,
    delay,
}: {
    title: string;
    value: string;
    icon: React.ElementType;
    iconColor: string;
    iconBg: string;
    delay: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
        className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 flex items-center gap-4 group hover:shadow-md transition-shadow duration-300"
    >
        <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
            style={{ backgroundColor: iconBg }}
        >
            <Icon className="w-7 h-7" style={{ color: iconColor }} />
        </div>
        <div>
            <p className="text-muted-foreground text-sm font-medium">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>
    </motion.div>
);

export const OutfitsStats = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
                title="Total Outfits"
                value="48,392"
                icon={Shirt}
                iconColor={NAVBAR_COLORS.primary}
                iconBg="var(--outfitly-primary-light, #fdf2f4)" // Fallback if var not defined
                delay={0}
            />
            <StatCard
                title="Pending Review"
                value="127"
                icon={Clock}
                iconColor="#d97706" // Warm yellow/orange
                iconBg="#fef3c7"
                delay={0.1}
            />
            <StatCard
                title="Total Likes"
                value="1.2M"
                icon={Heart}
                iconColor="#be185d" // Pink
                iconBg="#fce7f3"
                delay={0.2}
            />
        </div>
    );
};
