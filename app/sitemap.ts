import type { MetadataRoute } from "next";

const SITE_URL = "https://maeum-waiting-room.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: "2026-06-15",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
