import { useState, useRef } from "react";
import type { ExtendedProfileHeaderProps } from "./profileHeader.types";
import {
  getCroppedImg,
  uploadAvatar,
  normalizeWebsite,
  isValidWebsiteFinal,
} from "./profileHeader.utils";
import { updateProfile } from "../../profile.service";
import type { Crop } from "react-image-crop";

export function useProfileHeader({
  user,
  editForm,
  onUpdateForm,
}: Pick<ExtendedProfileHeaderProps, "user" | "editForm" | "onUpdateForm">) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({ unit: "%", width: 80, height: 80, x: 10, y: 10 });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [websiteError, setWebsiteError] = useState<string | null>(null);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const safeEditForm = editForm || user;

  /* ================== HANDLERS ================== */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setIsCropping(true);
  };

  const applyCrop = async () => {
    if (!completedCrop || !imgRef.current) return;

    try {
      const croppedFile = await getCroppedImg(imgRef.current, completedCrop);
      const avatarUrl = await uploadAvatar(croppedFile);

      onUpdateForm("avatarUrl", avatarUrl);
      setImagePreview(avatarUrl);
      setIsCropping(false);
    } catch (error) {
      console.error("Failed to upload avatar:", error);
      alert("Failed to upload avatar. Please try again.");
    }
  };

  const deleteAvatar = async () => {
    try {
      onUpdateForm("avatarUrl", "");
      setImagePreview(null);

      if (safeEditForm?.id) {
        await updateProfile(safeEditForm.id, { avatarUrl: "" });
      }
    } catch (error) {
      console.error("Failed to delete avatar:", error);
      alert("Failed to delete avatar.");
    }
  };

  const handleWebsiteBlur = () => {
    if (!safeEditForm) return;

    if (!isValidWebsiteFinal(safeEditForm.website)) {
      setWebsiteError("Please enter a valid website (example.com)");
      return;
    }

    onUpdateForm("website", normalizeWebsite(safeEditForm.website));
    setWebsiteError(null);
  };

  return {
    imagePreview,
    crop,
    setCrop,
    completedCrop,
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
  };
}
