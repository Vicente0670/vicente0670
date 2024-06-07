import "@/app/assets/styles/globals.css";
import Banner from "./assets/components/app/ui/banner/banner";
import Header from "./assets/components/app/ui/header/header";
import Footer from "./assets/components/app/page/footer/footer";
import Script from "next/script";

export default function Application({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <title>Vicente0670</title>
        <link rel="icon" href="/favicon.ico"/>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon.ico"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="keywords" content="vicente0670, vicente 0670, vicente, youtube, yt, website, com, app"/>
        <meta name="robots" content="index, follow"/>
        <meta name="language" content="English"/>
        <meta name="revisit-after" content="7 days"/>
        <meta name="author" content="Vicente0670"/>
        <meta name="theme-color" content="#416dd2"/>
        <meta property="og:title" content="Vicente0670"/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://vicente0670.com/"/>
        <meta property="og:image" content="/favicon.ico"/>
        <meta name="description" property="og:description" content="This page contains basic information, and as such does not have a proper layout."/>
        <meta name="twitter:card" content="summary_large_image"/>
      </head>
      <body>
        <Banner/>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}