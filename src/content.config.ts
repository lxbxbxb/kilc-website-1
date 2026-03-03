import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    order: z.number().optional(),
    heroImage: z.string().optional(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/team" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string().optional(),
    org: z.string().optional(),
    order: z.number().optional(),
  }),
});

const policies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/policies" }),
  schema: z.object({
    title: z.string(),
    lastUpdated: z.string().optional(),
  }),
});

const coverage = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/coverage" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().optional(),
  }),
});

const formationSteps = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/formation-steps" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    order: z.number().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().optional(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    excerpt: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  services,
  team,
  policies,
  coverage,
  formationSteps,
  blog,
};
