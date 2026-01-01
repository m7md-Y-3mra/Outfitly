"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Database, Trash2 } from "lucide-react";
import { GENERAL_SETTINGS } from "./settings.constants";
import { SettingsCard, SettingRow } from "./settings-card";

const SettingsPageWrapper = () => {
  // State for General Settings
  const [settings, setSettings] = useState<Record<string, boolean>>({
    publicRegistration: false,
    contentModeration: true,
    emailNotifications: true,
    maintenanceMode: false,
  });

  const handleToggle = (id: string, checked: boolean) => {
    setSettings((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <div className="pt-8 space-y-6">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Section 1: General Settings */}
        <SettingsCard title="General Settings">
          <div className="space-y-6">
            {GENERAL_SETTINGS.map((setting, index) => (
              <React.Fragment key={setting.id}>
                <SettingRow
                  icon={setting.icon}
                  title={setting.title}
                  subtitle={setting.subtitle}
                  checked={settings[setting.id]}
                  onChange={(checked) => handleToggle(setting.id, checked)}
                />
                {index < GENERAL_SETTINGS.length - 1 && <div className="h-px w-full bg-gray-100" />}
              </React.Fragment>
            ))}
          </div>
        </SettingsCard>

        {/* Section 2: Appearance */}
        <SettingsCard title="Appearance">
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
        </SettingsCard>

        {/* Section 3: Database & Storage */}
        <SettingsCard title="Database & Storage">
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
        </SettingsCard>
      </div>

      <div className="flex justify-end pt-6">
        <Button className="h-14 rounded-full bg-[#671425] px-8 text-base font-medium text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#56111f]">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default SettingsPageWrapper;
