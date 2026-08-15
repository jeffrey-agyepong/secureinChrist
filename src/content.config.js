import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({
    pattern: "**/index.mdx",
    base: "./src/content/blog",
    generateId: ({ entry }) => entry.replace(/[\\/]index\.mdx$/, "").replace(/\\/g, "/"),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
      canonical: z.string().url().optional(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      readingTime: z.number().int().positive().optional(),
      category: z.string(),
      tags: z.array(z.string()).default([]),
      author: z.string(),
      thumbnail: image(),
      thumbnailAlt: z.string().default(""),
      imageCredit: z
        .preprocess((value) => {
          if (!value || typeof value !== "object") return undefined;
          const v = value;
          // Keystatic writes this object with empty/null fields when a post has
          // no attribution filled in; treat that as "no credit" rather than invalid.
          if (!v.author && !v.authorUrl && !v.sourceUrl) return undefined;
          return value;
        }, z.object({
          caption: z.string().nullish(),
          author: z.string(),
          authorUrl: z.string().url(),
          source: z.string().nullish(),
          sourceUrl: z.string().url(),
        }).optional())
        .transform((v) =>
          v
            ? {
                caption: v.caption ?? undefined,
                author: v.author,
                authorUrl: v.authorUrl,
                source: v.source ?? "Unsplash",
                sourceUrl: v.sourceUrl,
              }
            : undefined
        ),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const authors = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/authors" }),
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    longBio: z.string(),
    avatar: z.string(),
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/categories" }),
  schema: z.object({
    name: z.string(),
  }),
});

const tags = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/tags" }),
  schema: z.object({
    name: z.string(),
  }),
});

const home = defineCollection({
  loader: glob({ pattern: "index.yaml", base: "./src/content/home" }),
  schema: z.object({
    heroHeadline: z.string(),
    heroSubhead: z.string(),
    primaryCtaLabel: z.string(),
    secondaryCtaLabel: z.string(),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: "index.mdx", base: "./src/content/about" }),
  schema: z.object({
    heading: z.string(),
  }),
});

const contact = defineCollection({
  loader: glob({ pattern: "index.yaml", base: "./src/content/contact" }),
  schema: z.object({
    heading: z.string(),
    intro: z.string(),
    pitchesBlurb: z.string(),
  }),
});

export const collections = { blog, authors, categories, tags, home, about, contact };
