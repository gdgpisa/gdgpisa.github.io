---
layout: null
---

var cacheName = 'gdgpisa-cache-v1.9';
var urlsToCache = [
    '/',
    '/index.html',      
    '/blog/',
    '/manifests/manifest_webapp.json',
    '/manifests/manifest_notpush.json',
    '/static/img/header.jpg',
    '/static/img/balloon_1.png',
    '/static/img/balloon_2.png',
    '/static/img/balloon_3.png',
    '/static/img/balloon_4.png',
    '/static/img/logo.png',
    '/static/css/main.css',
    '/static/css/bootstrap-material-design.min.css',
    '/static/css/bootstrap.min.css',
    '/static/css/syntax.css',
    '/static/css/thickbox.css',
    'https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',
    'https://code.jquery.com/jquery-migrate-1.2.1.min.js',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js',
    'https://use.fontawesome.com/18475ccca4.js',
    'https://s3.amazonaws.com/github/ribbons/forkme_left_green_007200.png',
    '/static/css/projects.css'
];

{% for asset in site.static_files %}
    {% if asset.path contains '/assets/images' or asset.path contains '/assets/posts' or asset.extname == '.js' %}
    urlsToCache.push("{{ file.path }}")
    {% endif %}
{% endfor %}

// Cache posts
{% for post in site.posts %}
  urlsToCache.push("{{ post.url }}")
{% endfor %}

// Cache pages
{% for page in site.html_pages %}
  urlsToCache.push("{{ page.url }}")
{% endfor %}

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

self.addEventListener('activate', function(event) {
  console.log('Finally active. Ready to start serving content!');  
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
