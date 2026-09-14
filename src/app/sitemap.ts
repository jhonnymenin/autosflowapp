import type { MetadataRoute } from "next";

import { vehicles } from "@/data/vehicles";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, priority: 1, changeFrequency: "weekly" },
    { url: `${siteUrl}/veiculos`, priority: 0.9, changeFrequency: "weekly" },
    {
      url: `${siteUrl}/tabela-de-precos`,
      priority: 0.7,
      changeFrequency: "weekly",
    },
    { url: `${siteUrl}/sobre`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${siteUrl}/contato`, priority: 0.6, changeFrequency: "monthly" },
  ];

  const vehiclePages: MetadataRoute.Sitemap = vehicles.map((vehicle) => ({
    url: `${siteUrl}/veiculos/${vehicle.slug}`,
    priority: 0.8,
    changeFrequency: "weekly",
  }));

  return [...pages, ...vehiclePages].map((entry) => ({
    ...entry,
    lastModified: now,
  }));
}
