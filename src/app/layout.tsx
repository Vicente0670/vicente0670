import "@/app/assets/styles/globals.css";
import GlobalHeader from "./assets/components/app/ui/header/header";
import Footer from "./assets/components/app/ui/footer/footer";
import Script from "next/script";
import type { Metadata, Viewport } from "next";
import { Noto_Sans } from "next/font/google";

const roboto = Noto_Sans({ subsets: ["latin"] });
export const viewport: Viewport = {
  themeColor: "#416dd2",
}
export const metadata: Metadata = {
  metadataBase: new URL("https://vicente0670.com/"),

  title: "Vicente0670",
  description: "This page contains basic information and does not have a proper layout.",
  icons: "/favicon.ico",

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico"/>
        <link rel="manifest" href="/manifest.json"/>
        <link rel="apple-touch-icon" href="/favicon.ico"/>
        <meta charSet="utf-8"/>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="language" content="English"/>
        <meta name="revisit-after" content="7 days"/>
        <meta name="author" content="Vicente0670"/>
        <meta name="theme-color" content="#416dd2"/>
        <Script src="/assets/scripts/header.js" strategy="beforeInteractive"/>
      </head>
      <body>
        <GlobalHeader/>
          {children}
        <Footer/>
      </body>
    </html>
  );
}