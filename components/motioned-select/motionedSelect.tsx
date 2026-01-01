"use client";

import { useField } from "formik";
import type React from "react";
import { Label } from "../ui/label";
import withMotion from "@/HOC/withMotion";
import clsx from "clsx";
import type { IStyle } from "@/@types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export type SelectOption = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  name: string;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  style?: IStyle;
  disabled?: boolean;
};

const baseLabelClasses = "text-sm font-medium text-foreground tracking-wide";

const baseTriggerClasses = [
  "w-full h-auto py-4 px-4 rounded-xl",
  "bg-[#FAF1ED] dark:bg-[#1C1C20]",
  "border-2 border-[#F2E8E3] dark:border-[#35353D]",
  "text-[#4C1420] dark:text-white",
  "focus:outline-none",
  "focus:border-[#671425] dark:focus:border-[#8B1D35]",
  "transition-all duration-300",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");

const invalidTriggerClasses = "aria-invalid:border-destructive";

const errorTextClasses =
  "mt-1 rounded-md border border-destructive/30 bg-destructive/5 px-2 py-1 text-xs text-destructive";

const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  label,
  options,
  placeholder = "Select an option...",
  style,
  disabled = false,
}) => {
  const [field, meta, helpers] = useField(name);

  const hasError = meta.touched && !!meta.error;

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name} className={clsx(style?.label ?? baseLabelClasses)}>
          {label}
        </Label>
      )}

      <Select
        value={field.value}
        onValueChange={(value) => helpers.setValue(value)}
        disabled={disabled}
      >
        <SelectTrigger
          id={name}
          aria-invalid={hasError || undefined}
          className={clsx(
            baseTriggerClasses,
            invalidTriggerClasses,
            style?.input,
            hasError && "border-destructive",
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasError && <p className={errorTextClasses}>{meta.error}</p>}
    </div>
  );
};

const MotionSelect = withMotion(CustomSelect);
export default MotionSelect;
