import { FC } from "react";
import { motion } from "framer-motion";
import { ButtonProps } from "./types";
import { sizeClasses, variantDefaults } from "./constants";

export const Button: FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  icon,
  badge,
  selected = false,
  className = "",
  style = {},
  onClick,
  type = "button",
}) => {
  const baseClasses =
    "transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden";

  const sizeClass = sizeClasses[size];

  // Motion variant
  if (variant === "motion") {
    return (
      <motion.button
        type={type}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseClasses} ${sizeClass} ${className}`}
        style={style}
      >
        {icon && <span>{icon}</span>}
        {children}
        {badge && <span>{badge}</span>}
      </motion.button>
    );
  }

  // Category variant has selected/unselected classes
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
      onClick={onClick}
      className={`${baseClasses} ${sizeClass} ${variantClasses} ${className}`}
      style={variantStyles}
    >
      {icon && <span>{icon}</span>}
      {children}
      {badge && <span>{badge}</span>}
    </button>
  );
};

{/* Usage Example:


<Button size="lg" variant="primary">
  Get Started Free <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
</Button>


<Button size="lg" variant="secondary">
  Watch Demo
</Button>

<Button size="xl" variant="gradient">
  Explore More Styles
</Button>

<Button variant="ghost">
  Sign In
</Button>

<Button variant="category" selected={true}>
  Category Name
</Button>

<Button variant="icon">
  <Edit className="w-4 h-4" /> Edit
</Button>

<Button size="md" variant="motion" icon={<ChevronRight className="w-5 h-5" />}>
  View Outfit
</Button>

*/}