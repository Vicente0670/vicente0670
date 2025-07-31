import type { MetadataRoute } from "next";
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/cgi-bin/",
    },
    sitemap: "https://acme.com/sitemap.xml",
  }
}