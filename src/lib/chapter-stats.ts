const SITEMAP_PAGES = [
  'https://gdg.community.dev/sitemap-chapters.xml',
  'https://gdg.community.dev/sitemap-chapters.xml?p=2',
  'https://gdg.community.dev/sitemap-chapters.xml?p=3',
  'https://gdg.community.dev/sitemap-chapters.xml?p=4',
];

// Regular (non "on campus") chapter slugs are just a city/org name with no
// country — e.g. gdg-pisa, gdg-milano — so there's no field to read the
// country from. This is the best available substitute: known Italian GDG
// chapter slugs, checked against the live sitemap at build time so the
// *count* stays current even though the *list* has to be maintained by
// hand. "On campus" chapters do include the country as the slug's last
// segment (e.g. gdg-on-campus-luiss-guido-carli-rome-italy), so those are
// matched automatically instead.
const KNOWN_ITALIAN_CHAPTER_SLUGS = [
  'gdg-pisa',
  'gdg-milano',
  'gdg-cloud-milano',
  'gdg-roma',
  'gdg-roma-citta',
  'gdg-torino',
  'gdg-cloud-torino',
  'gdg-firenze',
  'gdg-genova',
  'gdg-napoli',
  'gdg-bari',
  'gdg-catania',
  'gdg-palermo',
  'gdg-venezia',
  'gdg-vicenza',
  'gdg-brescia',
  'gdg-lecce',
  'gdg-pescara',
  'gdg-basilicata',
  'gdg-campobasso',
  'gdg-valle-daosta',
  'gdg-cloud-modena',
];

export interface ChapterStats {
  world: number;
  italy: number;
}

function extractSlugs(sitemapXml: string): string[] {
  const matches = [...sitemapXml.matchAll(/<loc>https:\/\/gdg\.community\.dev\/([^<\/]+)\/?<\/loc>/g)];
  return matches.map((m) => m[1].replace(/\/$/, ''));
}

/**
 * Counts current GDG chapters from community.dev's own public sitemap
 * (world: every listed chapter; italy: known Italian slugs + any "on
 * campus" chapter whose slug ends in "-italy"). Best-effort, like
 * fetchUpcomingEvent(): returns null on any failure so callers always
 * have a fallback.
 */
export async function fetchChapterStats(): Promise<ChapterStats | null> {
  try {
    const pages = await Promise.all(SITEMAP_PAGES.map((url) => fetch(url).then((res) => res.text())));
    const slugs = pages.flatMap(extractSlugs);
    if (slugs.length === 0) return null;

    const italy = slugs.filter(
      (slug) => KNOWN_ITALIAN_CHAPTER_SLUGS.includes(slug) || /^gdg-on-campus-.+-italy$/.test(slug),
    ).length;

    return { world: slugs.length, italy };
  } catch {
    return null;
  }
}

/** Rounds down to the nearest multiple of 5 and marks it as a floor with "+". */
export function roundedStat(n: number): string {
  const floor = Math.floor(n / 5) * 5;
  return `${floor}+`;
}
