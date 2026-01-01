import { FC, ButtonHTMLAttributes } from "react";
import { motion, MotionProps } from "framer-motion";
import { ButtonProps } from "./button.types";
import { sizeClasses, variantDefaults } from "./button.constants";
import { Loader2 } from "lucide-react";
import React from "react";

type MotionButtonProps = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & MotionProps;

const CustomButton: FC<MotionButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  icon,
  badge,
  selected = false,
  className = "",
  style = {},
  type = "button",
  loading = false,
  loadingText,
  disabled = false,
  ...rest
}) => {
  const baseClasses =
    "transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden";

  const sizeClass = sizeClasses[size];
  const isDisabled = loading || disabled;

  if (variant === "motion") {
    return (
      <motion.button
        type={type}
        className={`${baseClasses} ${sizeClass} ${className} ${
          isDisabled ? "opacity-60 cursor-not-allowed" : ""
        }`}
        style={style}
        {...rest}
        whileHover={!isDisabled ? { scale: 1.02 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        disabled={isDisabled}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Loader2 className="w-5 h-5 animate-spin" />
            </motion.div>
          )}

          {/* ✅ Only show loadingText OR children – never both */}
          <span>{loading ? (loadingText ?? "Loading...") : children}</span>
        </span>

        {/* Hover Shine */}
        {!loading && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
            initial={{ x: "-100%" }}
            whileHover={!isDisabled ? { x: "100%" } : {}}
            transition={{ duration: 0.6 }}
          />
        )}

        {/* Loading shimmer */}
        {loading && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* 🔇 Hide icon & badge while loading */}
        {!loading && icon && <span>{icon}</span>}
        {!loading && badge && <span>{badge}</span>}
      </motion.button>
    );
  }

  let variantClasses = "";
  let variantStyles: React.CSSProperties = { ...style };

  if (variant === "category") {
    variantClasses = selected
      ? variantDefaults.category.selectedClass
      : variantDefaults.category.unselectedClass;
  } else {
    variantClasses = variantDefaults[variant]?.className || "";
    variantStyles = { ...variantDefaults[variant]?.style, ...style };
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${sizeClass}  ${className} ${
        isDisabled ? "opacity-60 cursor-not-allowed" : variantClasses
      }`}
      style={variantStyles}
      {...rest}
      disabled={isDisabled}
    >
      {icon && <span>{icon}</span>}
      {children}
      {badge && <span>{badge}</span>}
    </button>
  );
};

export default CustomButton;
