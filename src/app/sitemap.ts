import type { MetadataRoute } from "next";
import { DEFAULT_DEPARTMENTS } from "@/lib/departments-data";
import { CONTENT_BLOCKS } from "@/lib/content-schema";
import { getPublishedNews } from "@/lib/data";

const BASE = "https://maulimedicalcollege.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPaths = [
    "",
    "/about",
    "/academics",
    "/admissions",
    "/facilities",
    "/faculty",
    "/hospital",
    "/college",
    "/clinical-material",
    "/gallery",
    "/contact",
    "/news",
    "/departments",
  ];

  const deptPaths = DEFAULT_DEPARTMENTS.map((d) => `/departments/${d.slug}`);

  const infoItems = CONTENT_BLOCKS.info_pages.default.items as ReadonlyArray<{
    slug: string;
  }>;
  const infoPaths = infoItems.map((p) => `/p/${p.slug}`);

  let newsPaths: string[] = [];
  try {
    const news = await getPublishedNews();
    newsPaths = news.map((n) => `/news/${n.slug}`);
  } catch {
    // DB not available at build time — skip news URLs.
  }

  return [...staticPaths, ...deptPaths, ...infoPaths, ...newsPaths].map(
    (path) => ({
      url: `${BASE}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );
}
