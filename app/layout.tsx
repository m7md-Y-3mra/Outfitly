import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { AppClientWrapper } from "@/components/app-wrapper/appClientWrapper";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import NextTopLoader from "nextjs-toploader";
import { Playpen_Sans_Arabic } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playpenArabic = Playpen_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Outfitly - Your Personal Style Journey",
    template: "%s | Outfitly",
  },
  description:
    "Discover your personal style with Outfitly. Organize your wardrobe, explore outfit ideas, and elevate your fashion game.",
  keywords: [
    "fashion",
    "wardrobe",
    "outfits",
    "style",
    "clothing",
    "personal style",
    "outfit planner",
  ],
  authors: [{ name: "Outfitly Team" }],
  creator: "Outfitly",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://outfitly.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Outfitly",
    title: "Outfitly - Your Personal Style Journey",
    description:
      "Discover your personal style with Outfitly. Organize your wardrobe, explore outfit ideas, and elevate your fashion game.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Outfitly Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outfitly - Your Personal Style Journey",
    description:
      "Discover your personal style with Outfitly. Organize your wardrobe, explore outfit ideas, and elevate your fashion game.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [{ url: "/transparent-logo.svg", type: "image/svg" }],
    apple: [{ url: "/logo.png" }],
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playpenArabic.className} antialiased`}>
        <NuqsAdapter>
          <AppClientWrapper>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextTopLoader />
              {children}
            </ThemeProvider>
          </AppClientWrapper>
        </NuqsAdapter>
        <Toaster richColors />
      </body>
    </html>
  );
}
