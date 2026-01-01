import { VideoSectionConfig } from "./video-section.types";

export const VIDEO_CONTENT = {
  heading: {
    title: "See Your Style Come to Life",
    subtitle: "Watch how Outfitly transforms your wardrobe experience",
  },
  overlayTexts: [
    { text: "Upload", progress: 0.1 },
    { text: "Organize", progress: 0.3 },
    { text: "Style", progress: 0.5 },
    { text: "Share", progress: 0.7 },
    { text: "Inspire", progress: 0.9 },
  ],
} as const;

export const VIDEO_CONFIG: VideoSectionConfig = {
  scrubSmoothing: 2,
  entrance: {
    duration: 0.8,
    ease: "power3.out",
  },
};

// Placeholder video - fashion/style related
// export const VIDEO_URL =
//   "https://assets.mixkit.co/videos/preview/mixkit-woman-running-above-the-camera-on-a-running-almost-3102-large.mp4";
export const VIDEO_URL = "/The_Journey_of_Personal_Style.mp4";

export const VIDEO_GRADIENTS = {
  light: {
    section: "linear-gradient(to bottom, rgba(250, 241, 237, 1), rgba(242, 232, 227, 1))",
    overlay: "linear-gradient(to bottom, rgba(103, 20, 37, 0.3), rgba(76, 20, 32, 0.5))",
    text: "linear-gradient(to bottom right, #671425, #6A1526)",
  },
  dark: {
    section: "linear-gradient(to bottom, rgba(26, 26, 26, 1), rgba(32, 32, 32, 1))",
    overlay: "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))",
    text: "linear-gradient(to bottom right, #FAF1ED, #F2E8E3)",
  },
} as const;
