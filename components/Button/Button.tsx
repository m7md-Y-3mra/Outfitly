import { FC, ButtonHTMLAttributes } from "react";
import { motion, MotionProps } from "framer-motion";
import { ButtonProps } from "./button.types";
import { sizeClasses, variantDefaults } from "./button.constants";

type MotionButtonProps = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & MotionProps;

export const Button: FC<MotionButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  icon,
  badge,
  selected = false,
  className = "",
  style = {},
  type = "button",
  ...rest
}) => {
  const baseClasses =
    "transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden";

  const sizeClass = sizeClasses[size];

  if (variant === "motion") {
    return (
      <motion.button
        type={type}
        className={`${baseClasses} ${sizeClass} ${className}`}
        style={style}
        {...rest} // this works now
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {icon && <span>{icon}</span>}
        {children}
        {badge && <span>{badge}</span>}
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
      className={`${baseClasses} ${sizeClass} ${variantClasses} ${className}`}
      style={variantStyles}
      {...rest}
    >
      {icon && <span>{icon}</span>}
      {children}
      {badge && <span>{badge}</span>}
    </button>
  );
};
