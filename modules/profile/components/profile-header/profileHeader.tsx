import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Link as LinkIcon, Calendar, Upload, Trash2 } from "lucide-react";
import { Card } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../components/ui/dialog";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import type { ProfileHeaderProps } from "./profileHeader.types";
import { getAvatarAlt } from "./profileHeader.utils";
import type { User } from "../../profile.types";
import { updateProfile } from "../../profile.service"; // make sure path is correct

interface ExtendedProfileHeaderProps extends ProfileHeaderProps {
  isEditing: boolean;
  editForm: User | null;
  onStartEditing: () => void;
  onCancelEditing: () => void;
  onSaveEditing: () => void;
  onUpdateForm: (field: keyof User, value: string) => void;
}

export function ProfileHeader({
  user,
  isEditing,
  editForm,
  onStartEditing,
  onCancelEditing,
  onSaveEditing,
  onUpdateForm,
}: ExtendedProfileHeaderProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [crop, setCrop] = useState<Crop>({ unit: "%", width: 80, height: 80, x: 10, y: 10 });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const safeEditForm = editForm || user;

  /* ================== IMAGE HELPERS ================== */
  const getCroppedImg = async (image: HTMLImageElement, crop: Crop): Promise<File> => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width!;
    canvas.height = crop.height!;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(
      image,
      crop.x! * scaleX,
      crop.y! * scaleY,
      crop.width! * scaleX,
      crop.height! * scaleY,
      0,
      0,
      crop.width!,
      crop.height!,
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(new File([blob!], "avatar.jpg", { type: "image/jpeg" }));
        },
        "image/jpeg",
        0.9,
      );
    });
  };

  /* ================== UPLOAD HELPER ================== */
  const uploadAvatar = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-avatar", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");

    const data = await res.json();
    return data.url;
  };

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

      // update form state and preview
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
      // reset UI
      onUpdateForm("avatarUrl", "");
      setImageFile(null);
      setImagePreview(null);

      // update DB immediately
      if (safeEditForm?.id) {
        await updateProfile(safeEditForm.id, { avatarUrl: "" });
      }
    } catch (error) {
      console.error("Failed to delete avatar:", error);
      alert("Failed to delete avatar.");
    }
  };

  const websiteUrl = user.website.startsWith("http") ? user.website : `https://${user.website}`;

  /* ================== RENDER AVATAR ================== */
  const renderAvatar = () => {
    if (imagePreview || safeEditForm.avatarUrl) {
      return (
        <img
          src={imagePreview || safeEditForm.avatarUrl}
          alt={getAvatarAlt(user.name)}
          className="w-full h-full object-cover"
        />
      );
    }

    // fallback to initials
    const initials = user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return (
      <div
        className="
    w-full h-full 
    flex items-center justify-center 
    rounded-full 
    text-white text-2xl font-extrabold 
    shadow-lg 
    animate-gradient animate-float
    "
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

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="p-8 mb-8 relative">
          <div className="flex flex-col md:flex-row gap-6">
            {/* AVATAR */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
              <div className="w-full h-full rounded-full overflow-hidden border border-gray-300">
                {renderAvatar()}
              </div>

              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
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
                    <Button size="sm" onClick={deleteAvatar}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* INFO */}
            <div className="flex-1">
              {isEditing ? (
                <>
                  <Input
                    value={safeEditForm.name}
                    onChange={(e) => onUpdateForm("name", e.target.value)}
                  />
                  <Textarea
                    value={safeEditForm.bio}
                    onChange={(e) => onUpdateForm("bio", e.target.value)}
                  />
                </>
              ) : (
                <>
                  <h2>{user.name}</h2>
                  <p>{user.bio}</p>
                </>
              )}

              <div className="flex gap-4 text-sm mt-4">
                <div className="flex gap-1 items-center">
                  <MapPin size={14} />
                  {isEditing ? (
                    <Input
                      value={safeEditForm.location}
                      onChange={(e) => onUpdateForm("location", e.target.value)}
                    />
                  ) : (
                    user.location
                  )}
                </div>

                <div className="flex gap-1 items-center">
                  <LinkIcon size={14} />
                  {isEditing ? (
                    <Input
                      value={safeEditForm.website}
                      onChange={(e) => onUpdateForm("website", e.target.value)}
                    />
                  ) : (
                    <a href={websiteUrl} target="_blank">
                      {user.website}
                    </a>
                  )}
                </div>

                <div className="flex gap-1 items-center">
                  <Calendar size={14} />
                  {user.joinDate}
                </div>
              </div>

              {isEditing ? (
                <div className="flex gap-2 mt-4">
                  <Button onClick={onSaveEditing}>Save</Button>
                  <Button variant="outline" onClick={onCancelEditing}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button className="mt-4" onClick={onStartEditing}>
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* CROP MODAL */}
      <Dialog open={isCropping} onOpenChange={setIsCropping}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crop Avatar</DialogTitle>
          </DialogHeader>

          {imagePreview && (
            <ReactCrop
              crop={crop}
              onChange={(_, percent) => setCrop(percent)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
            >
              <img ref={imgRef} src={imagePreview} />
            </ReactCrop>
          )}

          <div className="flex gap-2 mt-4">
            <Button onClick={applyCrop}>Apply</Button>
            <Button variant="outline" onClick={() => setIsCropping(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
