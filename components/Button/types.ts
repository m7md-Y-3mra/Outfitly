import { ReactNode } from "react";

export type ButtonSize = "sm" | "md" | "lg" | "xl";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "gradient"
  | "category"
  | "icon"
  | "motion";

export interface ButtonProps {
  children: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: ReactNode;
  badge?: ReactNode;
  selected?: boolean; // for category buttons
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}
