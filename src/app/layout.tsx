import type { Metadata, Viewport } from "next";
import { Menubar, Footer, Overlays } from "@/components/Chrome";
import { OsMode } from "@/components/OsMode";
import { Interactions } from "@/components/Interactions";
import "./globals.css";

export const metadata: Metadata = {
  title: "vivekanand roy · portfolio-os",
  description:
    "multidisciplinary designer and creative technologist. interfaces, xr, games, exhibitions and vibe-coded experiments.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f4f3ee",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=Inter+Tight:wght@400;500;600;700&family=Gochi+Hand&family=Inter:wght@400;500;600&display=swap"
        />
      </head>
      <body>
        <Menubar />
        {children}
        <Footer />
        <OsMode />
        <Overlays />
        <Interactions />
      </body>
    </html>
  );
}
