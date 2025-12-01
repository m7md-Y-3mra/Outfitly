"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SIZE_CONFIG } from "./constants";
import logoImage from "figma:asset/1adc24ea8f1835c8cc8590435c07c3918563cd45.png";
interface IProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  linkTo?: string;
  className?: string;
}



export function Logo({
  size = "md",
  animated = true,
  linkTo = "/",
  className = ""
}: IProps) {
  const logo = (
    <motion.div
      className={className}
      initial={animated ? { opacity: 0, y: -10 } : undefined}
      animate={animated ? { opacity: 1, y: 0 } : undefined}
      transition={animated ? { duration: 0.6, delay: 0.1 } : undefined}
    >
      {/* <Image
        src="/logo.png"
        alt="Outfitly Logo"
        width={SIZE_CONFIG[size] * 4} // keeps high resolution
        height={SIZE_CONFIG[size]}
        className="object-contain w-auto"
        priority
      /> */}
    </motion.div>
  );

  // With Link
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

  // Without Link
  return logo;
}
