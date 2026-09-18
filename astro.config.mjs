// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://gdgpisa.it',
  integrations: [sitemap()],
  redirects: {
    '/feedbackform': 'https://docs.google.com/forms/d/e/1FAIpQLSeEP5DZRNfcgFk53vkxpyt0oVTWlXfS0pT5E14VaDKmSFKv3g/viewform',
    '/gassistant': 'https://assistant.google.com/services/a/uid/00000087670de15f',
    '/telegram': 'https://t.me/+kS2vxtz9T1E0NDVk',
  },
});
