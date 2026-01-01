import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Outfitly",
    short_name: "Outfitly",
    description:
      "Discover your personal style with Outfitly. Organize your wardrobe, explore outfit ideas, and elevate your fashion game.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF1ED",
    theme_color: "#671425",
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
