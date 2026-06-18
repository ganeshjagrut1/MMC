import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/"],
    },
    sitemap: "https://maulimedicalcollege.com/sitemap.xml",
    host: "https://maulimedicalcollege.com",
  };
}
