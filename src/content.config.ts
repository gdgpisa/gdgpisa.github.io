import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function withIds(text: string) {
  const items = JSON.parse(text) as Array<Record<string, unknown>>;
  const seen = new Map<string, number>();
  return items.map((item) => {
    const base = slugify(String(item.name ?? ''));
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return { id: count === 0 ? base : `${base}-${count}`, ...item };
  });
}

const heroes = defineCollection({
  loader: file('./src/content/heroes/heroes.json', { parser: withIds }),
  schema: z.object({
    name: z.string(),
    surname: z.string(),
    info: z.string().optional(),
    image: z.string(),
    github: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    link: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    visible: z.boolean().default(true),
  }),
});

export const collections = { heroes };
