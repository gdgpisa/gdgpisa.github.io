---
layout: null
---


var cacheName = 'gdgpisa-cache-v1';
var filesToCache = [
    '/',      
    '/blog/',
    '/feedbackform/',
    '/blog/',
    '/category/jekyll',
    '/category/others',
    '/io16/plugin/markdown/example.html',
    '/io16/css/theme/',
    // can be automated rather than manual entries
    "/assets/header.jpg",
    "/static/img/avatar.png",
    "/static/img/logo.png",
    "/static/css/main.css",
    "/static/css/bootstrap-material-design.min.css",
    "/static/css/bootstrap.min.css",
    "/about.md",
    "/blog.html"
];
 
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => cache.addAll(filesToCache))
        .then(self.skipWaiting())
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    console.log('[*] Serving cached: ' + event.request.url);
                    return response;
                }

                console.log('[*] Fetching: ' + event.request.url);
                return fetch(event.request);
            }
        )
    );
});
