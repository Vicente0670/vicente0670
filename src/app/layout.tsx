import "./globals.css"; 

import NextTopLoader from "nextjs-toploader";
import Footer from "@/components/layout/footer/footer";
import GlobalHeader from "@/components/layout/header/header";

import Script from "next/script";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#416dd2",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  manifest: "/manifest.json",
  metadataBase: new URL("https://vicente0670.com/"),

  title: "Vicente0670",
  applicationName: "Vicente0670",
  description: "This page contains basic information and does not have a proper layout.",
  authors: [{ name: "Vicente0670", url: "/" }, { name: "tookender", url: "https://korino.dev" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },

  openGraph: {
    title: "Vicente0670",
    description: "This page contains basic information and does not have a proper layout.",
    images: "/vicente0670.png",
    authors: "Vicente0670",
  },

  robots: "all",
  keywords: "vicente0670, vicente 0670, vicente, youtube, yt, website, com, app",
};

export default function RootApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script src="/assets/scripts/header.js" strategy="beforeInteractive"/>
      </head>
      <body>
        <NextTopLoader // Change the gradient to your likings.
          color={"linear-gradient(to right, #ef4444, #22c55e, #3b82f6)"}
        />
        <GlobalHeader />

        {children}
        
        <Footer />
      </body>
    </html>
  );
}
