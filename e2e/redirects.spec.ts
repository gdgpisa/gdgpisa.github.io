import { expect, test } from '@playwright/test';

// `astro preview` serves configured redirects as real HTTP 301s (the
// static `dist/` output instead gets a meta-refresh HTML page, since a
// static host like GitHub Pages can't do server-side redirects — see
// astro.config.mjs). Either way, what we're verifying here is only that
// *our* redirect points at the intended URL — not that the third-party
// destination is still alive (one of them, /gassistant, in fact is not:
// Google discontinued Assistant Actions in 2023, see TODO.md).
const redirects: Array<{ from: string; toIncludes: string }> = [
  { from: '/telegram', toIncludes: 't.me/' },
  { from: '/feedbackform', toIncludes: 'docs.google.com/forms/' },
  { from: '/gassistant', toIncludes: 'assistant.google.com/' },
];

for (const { from, toIncludes } of redirects) {
  test(`${from} redirects to a URL containing "${toIncludes}"`, async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}${from}`, { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    expect(response.headers()['location']).toContain(toIncludes);
  });
}
