export type Season = 'halloween' | 'christmas';

interface SeasonRange {
  season: Season;
  // Inclusive [month (1-12), day] bounds, recurring every year. A range
  // whose `from` comes after its `to` wraps across New Year.
  from: [number, number];
  to: [number, number];
}

export const SEASON_RANGES: SeasonRange[] = [
  { season: 'halloween', from: [10, 24], to: [11, 1] },
  { season: 'christmas', from: [12, 1], to: [1, 6] },
];

const ROME_MONTH_DAY = new Intl.DateTimeFormat('en-US', {
  month: 'numeric',
  day: 'numeric',
  timeZone: 'Europe/Rome',
});

// Month/day as a sortable number (Oct 24 -> 1024), in Europe/Rome so the
// switch happens at local midnight regardless of the visitor's timezone.
function monthDay(date: Date): number {
  const parts = ROME_MONTH_DAY.formatToParts(date);
  const month = Number(parts.find((p) => p.type === 'month')?.value);
  const day = Number(parts.find((p) => p.type === 'day')?.value);
  return month * 100 + day;
}

export function seasonFor(date: Date): Season | null {
  const md = monthDay(date);
  for (const { season, from, to } of SEASON_RANGES) {
    const start = from[0] * 100 + from[1];
    const end = to[0] * 100 + to[1];
    const inRange = start <= end ? md >= start && md <= end : md >= start || md <= end;
    if (inRange) return season;
  }
  return null;
}

/**
 * Season to show: `override` (from the `?season=` query param) wins when it
 * names a known season, `none` forces no season, anything else falls back
 * to the date.
 */
export function activeSeason(date: Date, override?: string | null): Season | null {
  if (override === 'none') return null;
  const known = SEASON_RANGES.find((r) => r.season === override);
  return known ? known.season : seasonFor(date);
}
