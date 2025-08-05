import "./globals.css";
import { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Noto_Sans } from "next/font/google";
import ThemeManager from "./api/clientTheme/themeManager";

const defaultSchema = {
  title: "Vicente0670",
  description: "There's literally nothing here.",
  favicon: "./favicon.ico",
  authors: [{ name: "Vicente0670", url: "https://vicente0670.com/" }],
  authorsShort: "Vicente0670",
  keywords: "vicente0670, vicente 67, youtube, website, vicente website, vicente game",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vicente0670.com/"),
  
  title: defaultSchema.title,
  description: defaultSchema.description,
  authors: defaultSchema.authors,
  icons: { icon: defaultSchema.favicon, apple: defaultSchema.favicon },

  openGraph: {
    title: defaultSchema.title,
    description: defaultSchema.description,
    images: defaultSchema.favicon,
    authors: defaultSchema.authorsShort,  
  },

  robots: "all",
  keywords: defaultSchema.keywords,
};

export const viewport: Viewport = {
  themeColor: "#000", // To-Do: Decide on what primary theme color for the website
  width: "device-width",
  initialScale: 1,
};

const notoSans = Noto_Sans({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const globalCookies = await cookies();

  const themeCookie = "theme";
  const systemCookie = "isSystem";

  const theme = globalCookies.get(themeCookie)?.value || "unset";
  const system = globalCookies.get(systemCookie)?.value || "true";

  return (
    <html lang="en" className={notoSans.className + " " + theme} suppressHydrationWarning>
      <body>
        
        <ThemeManager theme={theme} system={system} />
        {children}
      </body>
    </html>
  )
}