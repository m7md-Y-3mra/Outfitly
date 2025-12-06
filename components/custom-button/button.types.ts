import { ReactNode, ButtonHTMLAttributes } from "react";

export type ButtonSize = "sm" | "md" | "lg" | "xl";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "gradient"
  | "category"
  | "icon"
  | "motion"
  | "link";

// Extend ALL native <button> props
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: ReactNode;
  badge?: ReactNode;
  selected?: boolean;
  loading?: boolean;
  loadingText?: string;
}
