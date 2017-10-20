---
layout: null
---


var cacheName = 'gdgpisa-cache-v1';
var filesToCache = [
    // Stylesheets
    // Pages and assets
    {% for page in site.html_pages %}
        {% if page.url contains 'projects' or page.url contains '404'   %}
            
        {% else %}
            '{{ page.url }}',
        {% endif %}
        
    {% endfor %}

    // Blog posts
    {% for post in site.posts %}
        '{{ post.url }}',
    {% endfor %}
 
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
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
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
