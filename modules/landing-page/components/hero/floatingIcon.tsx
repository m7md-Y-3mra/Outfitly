"use client";

import { Shirt, Watch } from "lucide-react";

interface FloatingIconProps {
  icon: "shirt" | "pants" | "dress" | "shoe" | "bag" | "watch";
  className?: string;
}

function PantsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 4h16v2c0 1-1 2-2 2H6c-1 0-2-1-2-2V4z" />
      <path d="M6 8v12l3-1V8" />
      <path d="M18 8v12l-3-1V8" />
      <path d="M9 8v11" />
      <path d="M15 8v11" />
    </svg>
  );
}

function DressIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2L8 6v2l-4 2 2 10h12l2-10-4-2V6l-4-4z" />
      <path d="M8 6h8" />
      <path d="M6 20l2 2h8l2-2" />
    </svg>
  );
}

function ShoeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 16c0 2 2 4 4 4h10c2 0 4-1 4-3v-1c0-1-1-2-2-2h-4c-2 0-3-1-3-3V8c0-1 1-2 2-2h1" />
      <path d="M8 14h2" />
      <path d="M4 16V8c0-2 2-4 4-4" />
    </svg>
  );
}

function BagIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 6h12l2 14H4L6 6z" />
      <path d="M9 6V4a3 3 0 0 1 6 0v2" />
      <path d="M8 10h8" />
    </svg>
  );
}

export function FloatingIcon({ icon, className }: FloatingIconProps) {
  switch (icon) {
    case "shirt":
      return <Shirt className={className} />;
    case "pants":
      return <PantsIcon className={className} />;
    case "dress":
      return <DressIcon className={className} />;
    case "shoe":
      return <ShoeIcon className={className} />;
    case "bag":
      return <BagIcon className={className} />;
    case "watch":
      return <Watch className={className} />;
    default:
      return <Shirt className={className} />;
  }
}
