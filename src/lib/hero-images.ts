import type { ImageMetadata } from 'astro';

// Hero photos live in src/assets/heroes/ (not public/) so astro:assets can
// resize and re-encode them. heroes.json keeps referencing plain filenames.
const images = import.meta.glob<{ default: ImageMetadata }>('../assets/heroes/*', { eager: true });

export function heroImage(file: string): ImageMetadata {
  const image = images[`../assets/heroes/${file}`];
  if (!image) throw new Error(`Hero image not found: src/assets/heroes/${file}`);
  return image.default;
}
