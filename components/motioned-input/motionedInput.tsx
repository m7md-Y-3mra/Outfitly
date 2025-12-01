"use client";

import { useState } from "react";
import type React from "react";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useField } from "formik";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import withMotion from "@/HOC/withMotion";
import clsx from "clsx";
import type { IStyle } from "@/@types";

import { Checkbox } from "../ui/checkbox";

type InputVariant = "filled" | "outline" | "subtle";

type CustomTextFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name"
> & {
  name: string;
  label?: string;
  isPassword?: boolean;
  style?: IStyle;
  variant?: InputVariant;
  icon?: React.ReactNode; // 👈 الأيقونة
};

const baseLabelClasses =
  "text-sm font-medium text-foreground tracking-wide";

const baseInputClasses = [
  // shape & size
  "w-full pr-4 py-4 rounded-xl h-auto",

  // background
  "bg-[#FAF1ED] dark:bg-[#1C1C20]",

  // border (نفس اللي في الديزاين)
  "border-2 border-[#F2E8E3] dark:border-[#35353D]",

  // text + placeholder
  "text-[#4C1420] dark:text-white",
  "placeholder-[#4C1420]/40 dark:placeholder-white/40",

  // focus
  "focus:outline-none",
  "focus:border-[#671425] dark:focus:border-[#8B1D35]",

  // transition
  "transition-all duration-300",

  // extras
  "selection:bg-primary selection:text-primary-foreground",
  "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");


const invalidInputClasses =
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";

const baseCheckboxClasses =
  "h-4 w-4 rounded-md border border-input bg-input-background transition-all duration-200";

const checkedCheckboxClasses =
  "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground";

const checkboxErrorClasses = "border-destructive";

const checkboxLabelClasses =
  "text-sm text-foreground cursor-pointer hover:text-primary transition-colors duration-200";

const passwordToggleButtonClasses = [
  "absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full",
  "text-muted-foreground hover:text-primary",
  "hover:bg-secondary",
  "transition-all duration-200",
].join(" ");

const errorTextClasses =
  "mt-1 rounded-md border border-destructive/30 bg-destructive/5 px-2 py-1 text-xs text-destructive";

const inputVariantClasses: Record<InputVariant, string> = {
  filled: "",
  outline: "",
  subtle: "",
};

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  name,
  label,
  isPassword,
  type,
  style,
  variant = "filled",
  icon,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta, helpers] = useField(name);

  const hasError = meta.touched && !!meta.error;
  const isCheckbox = type === "checkbox";

  return (
    <div className="space-y-2">
      {label && !isCheckbox && (
        <Label
          htmlFor={name}
          className={clsx(style?.label ?? baseLabelClasses)}
        >
          {label}
        </Label>
      )}

      <div className="relative">
        {/* 👇 الأيقونة على اليسار */}
        {icon && !isCheckbox && (
          <span
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#4C1420]/50 dark:text-white/60"
          >
            {icon}
          </span>
        )}

        {isCheckbox ? (
          <div className="flex items-center gap-3">
            <Checkbox
              id={name}
              checked={!!field.value}
              onCheckedChange={(val: boolean) => helpers.setValue(val)}
              className={clsx(
                baseCheckboxClasses,
                checkedCheckboxClasses,
                style?.input,
                hasError && checkboxErrorClasses
              )}
            />
            <Label
              htmlFor={name}
              className={clsx(style?.label ?? checkboxLabelClasses)}
            >
              {label}
            </Label>
          </div>
        ) : (
          <Input
            id={name}
            {...field}
            {...rest}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            aria-invalid={hasError || undefined}
            className={clsx(
              baseInputClasses,
              icon ? "pl-12" : "pl-4", // 👈 padding حسب وجود الأيقونة
              invalidInputClasses,
              inputVariantClasses[variant],
              style?.input,
              hasError && "border-destructive text-destructive"
            )}
          />
        )}

        {isPassword && !isCheckbox && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={passwordToggleButtonClasses}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-6 w-6" />
            ) : (
              <Eye className="h-6 w-6" />
            )}
          </Button>
        )}
      </div>

      {hasError && <p className={errorTextClasses}>{meta.error}</p>}
    </div>
  );
};

const MotionField = withMotion(CustomTextField);
export default MotionField;
