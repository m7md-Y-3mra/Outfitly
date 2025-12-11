"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SIZE_CONFIG } from "./constants";
import { useTheme } from "next-themes";
interface IProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  linkTo?: string;
  className?: string;
  color?: string; // optional: override color
}

export function Logo({
  size = "md",
  animated = true,
  linkTo = "/",
  className = "",
  color = "currentColor", // defaults to current text color
}: IProps) {
  const { theme } = useTheme();
  const logo = (
    <motion.div
      className={className}
      initial={animated ? { opacity: 0, y: -10 } : undefined}
      animate={animated ? { opacity: 1, y: 0 } : undefined}
      transition={animated ? { duration: 0.6, delay: 0.1 } : undefined}
    >
    <Image
      src="/logo.png"
      alt="Outfitly Logo"
      width={SIZE_CONFIG[size] * 1.2}
      height={SIZE_CONFIG[size]}
      className="object-contain w-auto filter transition duration-300"
      style={{
        filter: theme === "dark" ? "brightness(0) invert(1)" : "none",
      }}
    />
    </motion.div>
  );

  if (linkTo) {
    return (
      <Link href={linkTo}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block cursor-pointer"
        >
          {logo}
        </motion.div>
      </Link>
    );
  }

  return logo;
}
