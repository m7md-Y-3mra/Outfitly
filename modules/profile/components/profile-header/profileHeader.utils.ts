import type { Crop } from "react-image-crop";

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
