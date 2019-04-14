// sw.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! GDG Pisa is warming up 🎉`);
} else {
  console.log(`But it got a cold 😬`);
}
workbox.setConfig({debug: false})
// set names for both precache & runtime cache
workbox.core.setCacheNameDetails({
  prefix: "gdg-pisa-v3.3",
  suffix: "v1",
  precache: "precache",
  runtime: "runtime-cache"
});

// let Service Worker take control of pages ASAP
//workbox.skipWaiting();
//workbox.clientsClaim();

// default to `networkFirst` strategy
workbox.routing.setDefaultHandler(workbox.strategies.networkFirst());

// let Workbox handle our precache list
// NOTE: This will be populated by jekyll-workbox-plugin.
workbox.precaching.precacheAndRoute([]);

// use `Stale-while-revalidate` strategy for images and fonts.
workbox.routing.registerRoute(
  /images/,
  workbox.strategies.staleWhileRevalidate()
);
workbox.routing.registerRoute(
  /^https?:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate()
);
