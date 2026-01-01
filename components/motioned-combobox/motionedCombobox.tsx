"use client";

import { useField } from "formik";
import type React from "react";
import { useState } from "react";
import { Label } from "../ui/label";
import withMotion from "@/HOC/withMotion";
import clsx from "clsx";
import type { IStyle } from "@/@types";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type CustomComboboxProps = {
  name: string;
  label?: string;
  options: string[];
  placeholder?: string;
  style?: IStyle;
  disabled?: boolean;
};

const baseLabelClasses = "text-sm font-medium text-foreground tracking-wide";

const baseButtonClasses = [
  "w-full justify-between h-auto py-4 px-4 rounded-xl",
  "bg-[#FAF1ED] dark:bg-[#1C1C20]",
  "border-2 border-[#F2E8E3] dark:border-[#35353D]",
  "text-[#4C1420] dark:text-white",
  "hover:bg-[#FAF1ED] dark:hover:bg-[#1C1C20]",
  "focus:outline-none",
  "focus:border-[#671425] dark:focus:border-[#8B1D35]",
  "transition-all duration-300",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");

const invalidButtonClasses = "aria-invalid:border-destructive";

const errorTextClasses =
  "mt-1 rounded-md border border-destructive/30 bg-destructive/5 px-2 py-1 text-xs text-destructive";

const CustomCombobox: React.FC<CustomComboboxProps> = ({
  name,
  label,
  options,
  placeholder = "Select or type...",
  style,
  disabled = false,
}) => {
  const [field, meta, helpers] = useField(name);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const hasError = meta.touched && !!meta.error;

  const handleSelect = (value: string) => {
    helpers.setValue(value);
    setOpen(false);
    setSearch("");
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    // Allow custom input - update field value as user types
    helpers.setValue(value);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name} className={clsx(style?.label ?? baseLabelClasses)}>
          {label}
        </Label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={name}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-invalid={hasError || undefined}
            disabled={disabled}
            className={clsx(
              baseButtonClasses,
              invalidButtonClasses,
              style?.input,
              hasError && "border-destructive",
              !field.value && "text-[#4C1420]/40 dark:text-white/40",
            )}
          >
            {field.value || placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search or type custom brand..."
              value={search}
              onValueChange={handleSearchChange}
            />
            <CommandList>
              {filteredOptions.length === 0 && search.length > 0 && (
                <CommandEmpty>
                  <button
                    type="button"
                    onClick={() => handleSelect(search)}
                    className="w-full text-left px-2 py-1.5 text-sm hover:bg-accent rounded-sm"
                  >
                    Use &quot;{search}&quot; as custom brand
                  </button>
                </CommandEmpty>
              )}
              {filteredOptions.length === 0 && search.length === 0 && (
                <CommandEmpty>No brands found.</CommandEmpty>
              )}
              {filteredOptions.length > 0 && (
                <CommandGroup>
                  {filteredOptions.map((option) => (
                    <CommandItem key={option} value={option} onSelect={() => handleSelect(option)}>
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value === option ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {option}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {hasError && <p className={errorTextClasses}>{meta.error}</p>}
    </div>
  );
};

const MotionCombobox = withMotion(CustomCombobox);
export default MotionCombobox;
