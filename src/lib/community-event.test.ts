import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchUpcomingEvent } from './community-event';

describe('fetchUpcomingEvent', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('maps the API response to a CommunityEvent on success', async () => {
    const apiResponse = {
      results: [
        {
          title: 'Tutto quello che avrei voluto sapere prima di fare un videogioco',
          start_date: '2026-10-01T16:30:00Z',
          description_short: 'Explore the basics of game development.',
          cropped_banner_url: 'https://res.cloudinary.com/example/banner.jpg',
          url: 'https://gdg.community.dev/events/details/example/',
          event_type_title: 'Free registration',
        },
      ],
    };
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(apiResponse) }),
    );

    const event = await fetchUpcomingEvent();

    expect(event).toEqual({
      title: apiResponse.results[0].title,
      startDate: apiResponse.results[0].start_date,
      descriptionShort: apiResponse.results[0].description_short,
      bannerUrl: apiResponse.results[0].cropped_banner_url,
      url: apiResponse.results[0].url,
      eventType: apiResponse.results[0].event_type_title,
    });
  });

  it('returns null when there is no upcoming event', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ results: [] }) }));

    expect(await fetchUpcomingEvent()).toBeNull();
  });

  it('returns null on a non-OK HTTP response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, json: () => Promise.resolve({}) }));

    expect(await fetchUpcomingEvent()).toBeNull();
  });

  it('returns null instead of throwing on a network error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));

    expect(await fetchUpcomingEvent()).toBeNull();
  });

  it('returns null on malformed (non-JSON-parseable) responses', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: () => Promise.reject(new Error('invalid json')) }),
    );

    expect(await fetchUpcomingEvent()).toBeNull();
  });
});
