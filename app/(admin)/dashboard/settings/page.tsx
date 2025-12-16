"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Shield, Mail, Lock, Upload, Database, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SettingsPage = () => {
  const [publicRegistration, setPublicRegistration] = useState(false);
  const [contentModeration, setContentModeration] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="pt-8 space-y-6">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Section 1: General Settings */}
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-[#671425]">General Settings</h2>
          <div className="space-y-6">
            <SettingRow
              icon={Globe}
              title="Public Registration"
              subtitle="Allow new users to register"
              checked={publicRegistration}
              onChange={setPublicRegistration}
            />
            <div className="h-px w-full bg-gray-100" />
            <SettingRow
              icon={Shield}
              title="Content Moderation"
              subtitle="Enable automatic content moderation"
              checked={contentModeration}
              onChange={setContentModeration}
            />
            <div className="h-px w-full bg-gray-100" />
            <SettingRow
              icon={Mail}
              title="Email Notifications"
              subtitle="Send email notifications to admins"
              checked={emailNotifications}
              onChange={setEmailNotifications}
            />
            <div className="h-px w-full bg-gray-100" />
            <SettingRow
              icon={Lock}
              title="Maintenance Mode"
              subtitle="Put the site in maintenance mode"
              checked={maintenanceMode}
              onChange={setMaintenanceMode}
            />
          </div>
        </div>

        {/* Section 2: Appearance */}
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-[#671425]">Appearance</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">Brand Color</Label>
              <div className="flex items-center gap-3 rounded-xl bg-[#FDFBF7] px-4 py-3">
                <div className="h-6 w-6 rounded-full bg-[#671425] shadow-sm ring-2 ring-white" />
                <span className="font-mono text-sm font-medium text-gray-600">#671425</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">Site Logo</Label>
              <div className="flex items-start">
                <Button
                  variant="outline"
                  className="h-12 w-full gap-2 rounded-xl border-gray-200 bg-white hover:bg-gray-50 hover:text-gray-900"
                >
                  <Upload className="h-4 w-4" />
                  Upload Logo
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Database & Storage */}
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-[#671425]">Database & Storage</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Button
              variant="secondary"
              className="h-14 gap-2 rounded-xl bg-[#FDFBF7] text-[#671425] hover:bg-[#F3EFE9]"
            >
              <Database className="h-5 w-5" />
              Backup Database
            </Button>
            <Button
              variant="secondary"
              className="h-14 gap-2 rounded-xl bg-[#FDFBF7] text-[#671425] hover:bg-[#F3EFE9]"
            >
              <Trash2 className="h-5 w-5" />
              Clear Cache
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button className="h-14 rounded-full bg-[#671425] px-8 text-base font-medium text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#56111f]">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

interface SettingRowProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const SettingRow = ({ icon: Icon, title, subtitle, checked, onChange }: SettingRowProps) => {
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

export default SettingsPage;
