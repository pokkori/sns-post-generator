import { MetadataRoute } from "next";

const SITE_URL = "https://sns-post-generator-mu.vercel.app";

const KEYWORD_SLUGS = [
  "twitter-bazu-toukourei",
  "instagram-caption-kakikata",
  "sns-marketing-bun-sakusei",
  "tiktok-douga-setsumei",
  "note-article-sns-shokai",
  "twitter-thread-kakikata",
  "sns-business-pr-bun",
  "instagram-profile-kakikata",
  "sns-hashtag-koukatek",
  "line-official-toukou-template",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/tool`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/legal`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];
  const keywordPages: MetadataRoute.Sitemap = KEYWORD_SLUGS.map((slug) => ({
    url: `${SITE_URL}/keywords/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  return [...staticPages, ...keywordPages];
}
