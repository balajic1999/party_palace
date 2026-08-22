import type { MetadataRoute } from "next";
import { packages } from "@/content/packages";
import { policies } from "@/content/policies";

const BASE = "https://partypalace.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${BASE}/gallery`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...packages.map((p) => ({
      url: `${BASE}/packages/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...policies.map((p) => ({
      url: `${BASE}/policies/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
