"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Link as LinkIcon, Calendar, Upload, Trash2 } from "lucide-react";
import { Card } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../components/ui/dialog";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import type { ExtendedProfileHeaderProps } from "./profileHeader.types";
import { getAvatarAlt } from "./profileHeader.utils";
import { useTheme } from "next-themes";
import { useProfileHeader } from "./useProfileHeader";
import Image from "next/image";

export function ProfileHeader(props: ExtendedProfileHeaderProps) {
  const { theme } = useTheme();

  const {
    imagePreview,
    crop,
    setCrop,
    setCompletedCrop,
    isCropping,
    setIsCropping,
    websiteError,
    imgRef,
    fileInputRef,
    safeEditForm,
    handleFileChange,
    applyCrop,
    deleteAvatar,
    handleWebsiteBlur,
  } = useProfileHeader(props);

  const { user, isEditing, onStartEditing, onCancelEditing, onSaveEditing, onUpdateForm } = props;

  const renderAvatar = () => {
    if (imagePreview || safeEditForm.avatarUrl) {
      return (
        <Image
          src={imagePreview || safeEditForm.avatarUrl}
          alt={getAvatarAlt(user.name)}
          className="w-full h-full object-cover"
          fill
        />
      );
    }

    const initials = user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return (
      <div
        className="w-full h-full flex items-center justify-center rounded-full text-white text-2xl font-extrabold shadow-lg animate-gradient animate-float"
        style={{
          background: `linear-gradient( var(--outfitly-gradient-start), var(--outfitly-gradient-mid), var(--outfitly-gradient-end))`,
          backgroundSize: "200% 200%",
          textShadow: "1px 1px 3px rgba(0,0,0,0.4)",
        }}
      >
        {initials}
      </div>
    );
  };

  const websiteUrl = user.website.startsWith("http") ? user.website : `https://${user.website}`;

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card
          className="p-8 border-2 shadow-xl mb-8 relative overflow-hidden"
          style={{
            borderColor:
              theme === "dark" ? "var(--outfitly-bg-tertiary)" : "var(--outfitly-bg-secondary)",
            backgroundColor: "var(--card)",
          }}
        >
          <div className="flex flex-col items-center md:flex-row gap-8">
            {/* AVATAR */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
              <div
                className="w-full h-full rounded-full overflow-hidden border-4 shadow-lg transition-all duration-300 hover:shadow-2xl"
                style={{
                  borderColor:
                    theme === "dark" ? "var(--outfitly-primary)" : "var(--outfitly-bg-secondary)",
                }}
              >
                {renderAvatar()}
              </div>

              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full transition-opacity duration-300">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => fileInputRef.current?.click()}>
                      <Upload className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={deleteAvatar}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* INFO */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    placeholder="Enter your name"
                    value={safeEditForm.name}
                    onChange={(e) => onUpdateForm("name", e.target.value)}
                    className="text-lg font-semibold"
                  />
                  <Textarea
                    placeholder="Tell us about yourself..."
                    value={safeEditForm.bio}
                    onChange={(e) => onUpdateForm("bio", e.target.value)}
                    className="resize-none"
                    rows={3}
                  />
                </div>
              ) : (
                <>
                  <h2 className="mb-2 text-3xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient">
                    {user.name}
                  </h2>
                  <p className="mb-6 max-w-2xl text-muted-foreground text-lg leading-relaxed">
                    {user.bio}
                  </p>
                </>
              )}

              <div className="flex flex-wrap gap-6 text-sm mt-6 justify-center md:justify-start">
                <div className="flex gap-2 items-center hover:text-primary transition-colors duration-300">
                  <MapPin size={16} className="text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      placeholder="Your location"
                      value={safeEditForm.location}
                      onChange={(e) => onUpdateForm("location", e.target.value)}
                      className="w-32"
                    />
                  ) : (
                    <span className="text-muted-foreground font-medium">{user.location}</span>
                  )}
                </div>

                <div className="flex gap-2 items-center hover:text-primary transition-colors duration-300">
                  <LinkIcon size={16} className="text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      placeholder="Your website"
                      value={safeEditForm.website}
                      onChange={(e) => onUpdateForm("website", e.target.value)}
                      onBlur={handleWebsiteBlur}
                    />
                  ) : (
                    <a
                      href={websiteUrl}
                      className="hover:underline transition-colors duration-300 text-primary font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.website}
                    </a>
                  )}
                  {websiteError && <p className="text-xs text-red-500 mt-1">{websiteError}</p>}
                </div>

                <div className="flex gap-2 items-center">
                  <Calendar size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground font-medium">{user.joinDate}</span>
                </div>
              </div>

              {isEditing ? (
                <div className="flex gap-4 mt-6 justify-center md:justify-start">
                  <Button onClick={onSaveEditing} className="px-6">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={onCancelEditing} className="px-6">
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button className="mt-6 px-8" onClick={onStartEditing}>
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* CROP MODAL */}
      <Dialog open={isCropping} onOpenChange={setIsCropping}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Crop Your Avatar</DialogTitle>
          </DialogHeader>

          {imagePreview && (
            <ReactCrop
              crop={crop}
              onChange={(_: Crop, percentCrop: Crop) => setCrop(percentCrop)}
              onComplete={(c: Crop) => setCompletedCrop(c)}
              aspect={1}
            >
              <Image
                ref={imgRef}
                src={imagePreview}
                alt="Avatar"
                fill
                className="max-w-full h-auto"
              />
            </ReactCrop>
          )}

          <div className="flex gap-4 mt-6 justify-center">
            <Button onClick={applyCrop}>Apply Crop</Button>
            <Button variant="outline" onClick={() => setIsCropping(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
