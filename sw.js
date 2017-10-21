var cacheName = 'gdgpisa-cache-v1.1';
var urlsToCache = [
    '/',
    '/index.html',      
    '/blog/',
    '/feedbackform/',
    '/blog/',
    '/category/jekyll',
    '/category/others',
    '/io16/plugin/markdown/example.html',
    '/io16/css/theme/',
    '/manifests/manifest_webapp.json',
    '/manifests/manifest_notpush.json',
    // can be automated rather than manual entries
    "/assets/header.jpg",
    "/static/img/avatar.png",
    "/static/img/logo.png",
    "/static/css/main.css",
    "/static/css/bootstrap-material-design.min.css",
    "/static/css/bootstrap.min.css",
    // "/about.md",
    // "/blog.html"
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
