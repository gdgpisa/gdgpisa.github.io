// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://gdgpisa.it',
  integrations: [sitemap()],
  // Inline the (small) CSS so it doesn't block first paint on a separate request.
  build: { inlineStylesheets: 'always' },
  redirects: {
    '/feedbackform': 'https://docs.google.com/forms/d/e/1FAIpQLSeEP5DZRNfcgFk53vkxpyt0oVTWlXfS0pT5E14VaDKmSFKv3g/viewform',
    '/telegram': 'https://t.me/+kS2vxtz9T1E0NDVk',
  },
});
