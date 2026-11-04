// Kill switch for the Workbox service worker the old Jekyll site registered
// at /sw.js. Browsers that still have it installed fetch this file on their
// next visit, install it in its place, and it then clears the old caches,
// unregisters itself and reloads open tabs onto the live site.
// Safe to delete once old visitors have had time to come back (mid-2027).
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) await caches.delete(key);
      await self.registration.unregister();
      for (const client of await self.clients.matchAll({ type: 'window' })) client.navigate(client.url);
    })(),
  );
});
