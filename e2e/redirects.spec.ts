import { expect, test } from '@playwright/test';

// `astro dev` serves configured redirects as real HTTP 301s, while the
// static `dist/` output (served by `astro preview` and GitHub Pages) gets
// a meta-refresh HTML page, since a static host can't do server-side
// redirects — see astro.config.mjs. Either way, what we're verifying here is only that
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
    if (response.status() === 301) {
      expect(response.headers()['location']).toContain(toIncludes);
    } else {
      expect(response.status()).toBe(200);
      const html = await response.text();
      const target = html.match(/<meta http-equiv="refresh" content="0;url=([^"]+)"/)?.[1];
      expect(target).toContain(toIncludes);
    }
  });
}
