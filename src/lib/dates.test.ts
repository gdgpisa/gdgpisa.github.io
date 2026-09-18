import { describe, expect, it } from 'vitest';
import { formatDateIt, formatDateTimeIt } from './dates';

describe('formatDateIt', () => {
  it('formats a date in long Italian form', () => {
    // Noon UTC to stay clear of the Europe/Rome day boundary regardless of
    // where the test runner's own TZ env var is set.
    const date = new Date('2026-04-18T12:00:00Z');
    expect(formatDateIt(date)).toBe('18 aprile 2026');
  });

  it('respects Europe/Rome, not the runner locale, for the day/month', () => {
    const date = new Date('2026-01-01T12:00:00Z');
    expect(formatDateIt(date)).toBe('1 gennaio 2026');
  });
});

describe('formatDateTimeIt', () => {
  it('formats date and time together, in 24h form', () => {
    // 2026-04-18T16:30:00Z is 18:30 in Europe/Rome (CEST, UTC+2 in April).
    const date = new Date('2026-04-18T16:30:00Z');
    expect(formatDateTimeIt(date)).toBe('18 aprile 2026 alle ore 18:30');
  });

  it('converts a winter UTC timestamp to CET (UTC+1)', () => {
    const date = new Date('2026-01-15T17:00:00Z');
    expect(formatDateTimeIt(date)).toBe('15 gennaio 2026 alle ore 18:00');
  });
});
