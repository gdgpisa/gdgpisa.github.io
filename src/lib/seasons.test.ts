import { describe, expect, it } from 'vitest';
import { activeSeason, seasonFor } from './seasons';

describe('seasonFor', () => {
  it('is halloween from Oct 24 to Nov 1, inclusive', () => {
    expect(seasonFor(new Date('2026-10-23T12:00:00Z'))).toBeNull();
    expect(seasonFor(new Date('2026-10-24T12:00:00Z'))).toBe('halloween');
    expect(seasonFor(new Date('2026-10-31T12:00:00Z'))).toBe('halloween');
    expect(seasonFor(new Date('2026-11-01T12:00:00Z'))).toBe('halloween');
    expect(seasonFor(new Date('2026-11-02T12:00:00Z'))).toBeNull();
  });

  it('is christmas from Dec 1 to Jan 6, wrapping across New Year', () => {
    expect(seasonFor(new Date('2026-11-30T12:00:00Z'))).toBeNull();
    expect(seasonFor(new Date('2026-12-01T12:00:00Z'))).toBe('christmas');
    expect(seasonFor(new Date('2026-12-31T12:00:00Z'))).toBe('christmas');
    expect(seasonFor(new Date('2027-01-06T12:00:00Z'))).toBe('christmas');
    expect(seasonFor(new Date('2027-01-07T12:00:00Z'))).toBeNull();
  });

  it('switches at midnight Europe/Rome, not UTC', () => {
    // 23:30 UTC on Oct 23 is already 01:30 on Oct 24 in Rome (CEST).
    expect(seasonFor(new Date('2026-10-23T23:30:00Z'))).toBe('halloween');
  });

  it('is null the rest of the year', () => {
    expect(seasonFor(new Date('2026-06-15T12:00:00Z'))).toBeNull();
  });
});

describe('activeSeason', () => {
  const june = new Date('2026-06-15T12:00:00Z');
  const halloween = new Date('2026-10-31T12:00:00Z');

  it('uses a known override regardless of the date', () => {
    expect(activeSeason(june, 'christmas')).toBe('christmas');
    expect(activeSeason(halloween, 'christmas')).toBe('christmas');
  });

  it('forces no season with "none"', () => {
    expect(activeSeason(halloween, 'none')).toBeNull();
  });

  it('falls back to the date for a missing or unknown override', () => {
    expect(activeSeason(halloween, null)).toBe('halloween');
    expect(activeSeason(halloween, 'easter')).toBe('halloween');
  });
});
