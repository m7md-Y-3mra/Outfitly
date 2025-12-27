import type { Crop } from "react-image-crop";
import { S3_BUCKET_NAME } from "@/config/env.config";

export const getAvatarAlt = (userName: string): string =>
  userName ? `${userName.slice(0, 2).toUpperCase()}` : "U";

export const normalizeWebsite = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("http://") || trimmed.startsWith("https://")
    ? trimmed
    : `https://${trimmed}`;
};

export const isValidWebsiteFinal = (value: string): boolean => {
  if (!value.trim()) return true;
  const normalized = normalizeWebsite(value);
  try {
    new URL(normalized);
    return normalized.includes(".");
  } catch {
    return false;
  }
};

export const getCroppedImg = async (image: HTMLImageElement, crop: Crop): Promise<File> => {
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

export const uploadAvatar = async (file: File): Promise<string> => {
  // 1. Get presigned URL from S3
  const presignedResponse = await fetch("/api/s3/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
      size: file.size,
    }),
  });

  if (!presignedResponse.ok) {
    throw new Error("Failed to get presigned URL");
  }

  const { presignedUrl, key } = await presignedResponse.json();

  // 2. Upload file directly to S3
  const uploadResponse = await fetch(presignedUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!uploadResponse.ok) {
    throw new Error("Upload to S3 failed");
  }

  // 3. Return the S3 URL
  return `https://${S3_BUCKET_NAME}.fly.storage.tigris.dev/${key}`;
};

export const deleteAvatarFromS3 = async (avatarUrl: string): Promise<void> => {
  if (!avatarUrl || !avatarUrl.includes(".dev/")) return;

  const key = avatarUrl.split(".dev/")[1];
  if (!key) return;

  const response = await fetch("/api/s3/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete avatar from S3");
  }
};
