import { expect, test } from '@playwright/test';

const MOCK_EVENT_RESPONSE = {
  results: [
    {
      title: 'Mock DevFest Talk',
      start_date: '2026-10-01T16:30:00Z',
      description_short: 'A mocked event, so this test never depends on the live community.dev API.',
      cropped_banner_url: 'https://example.com/banner.jpg',
      url: 'https://gdg.community.dev/events/details/mock/',
      event_type_title: 'Free registration',
    },
  ],
};

test.describe('Home page', () => {
  test('renders the upcoming-event widget with mocked data', async ({ page }) => {
    await page.route('**/api/event_slim/**', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(MOCK_EVENT_RESPONSE) }),
    );

    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Mock DevFest Talk' })).toBeVisible();
    await expect(page.getByText('A mocked event, so this test never depends')).toBeVisible();
  });

  // The empty/fallback state only renders when fetchUpcomingEvent() returns
  // null at BUILD time (the client-side refresh only ever *upgrades* the
  // build-time snapshot to newer data — see UpcomingEvent.astro — it never
  // downgrades a real event back to the empty state). Playwright's route
  // mocking only intercepts browser-side requests, not the Node-side fetch
  // astro build makes while pre-rendering, so that path isn't reachable
  // from here; it's covered instead by the fetchUpcomingEvent() unit tests
  // in src/lib/community-event.test.ts (empty/error/network-failure cases).

  test('shows the whole visible team, centered', async ({ page }) => {
    await page.goto('/');

    const team = page.locator('.team__member');
    await expect(team.first()).toBeVisible();
    expect(await team.count()).toBeGreaterThan(0);
  });
});
