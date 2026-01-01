"use client";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { LucideIcon } from "lucide-react";

interface SettingRowProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const SettingRow = ({ icon: Icon, title, subtitle, checked, onChange }: SettingRowProps) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDFBF7]">
          <Icon className="h-5 w-5 text-[#671425]" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
};

interface SettingsCardProps {
  title: string;
  children: React.ReactNode;
}

export const SettingsCard = ({ title, children }: SettingsCardProps) => {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-[#671425]">{title}</h2>
      {children}
    </div>
  );
};
