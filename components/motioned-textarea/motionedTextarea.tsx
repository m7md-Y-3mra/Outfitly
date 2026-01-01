"use client";

import { useField } from "formik";
import type React from "react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import withMotion from "@/HOC/withMotion";
import clsx from "clsx";
import type { IStyle } from "@/@types";

type CustomTextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> & {
  name: string;
  label?: string;
  style?: IStyle;
  rows?: number;
};

const baseLabelClasses = "text-sm font-medium text-foreground tracking-wide";

const baseTextareaClasses = [
  "w-full px-4 py-4 rounded-xl",
  "bg-[#FAF1ED] dark:bg-[#1C1C20]",
  "border-2 border-[#F2E8E3] dark:border-[#35353D]",
  "text-[#4C1420] dark:text-white",
  "placeholder-[#4C1420]/40 dark:placeholder-white/40",
  "focus:outline-none",
  "focus:border-[#671425] dark:focus:border-[#8B1D35]",
  "transition-all duration-300",
  "selection:bg-primary selection:text-primary-foreground",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  "resize-y min-h-[120px]",
].join(" ");

const invalidTextareaClasses =
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";

const errorTextClasses =
  "mt-1 rounded-md border border-destructive/30 bg-destructive/5 px-2 py-1 text-xs text-destructive";

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  name,
  label,
  style,
  rows = 5,
  ...rest
}) => {
  const [field, meta] = useField(name);

  const hasError = meta.touched && !!meta.error;

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name} className={clsx(style?.label ?? baseLabelClasses)}>
          {label}
        </Label>
      )}

      <Textarea
        id={name}
        {...field}
        {...rest}
        rows={rows}
        aria-invalid={hasError || undefined}
        className={clsx(
          baseTextareaClasses,
          invalidTextareaClasses,
          style?.input,
          hasError && "border-destructive text-destructive",
        )}
      />

      {hasError && <p className={errorTextClasses}>{meta.error}</p>}
    </div>
  );
};

const MotionTextarea = withMotion(CustomTextarea);
export default MotionTextarea;
