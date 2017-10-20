---
layout: null
---

'use strict';

const cacheVersion = {{'now' | date: '%s' }};
const offlineCache = 'offline-' + cacheVersion;
const offlinePage = 'offline.html';
const debugMode = false;

/**
 * Delete caches that do not match the current version of the service worker.
 *
 * @returns {*|Promise.<TResult>}
 */
function clearOldCaches() {
    debug("Clean old caches");
    return caches.keys().then(keys => {
        return Promise.all(
            keys
                .filter(key => key.indexOf(offlineCache) !== 0)
                .map(key => caches.delete(key))
        );
    });
}

function cacheOfflinePage() {
    debug("Cache offline page");
    return caches.open(offlineCache)
        .then(cache => {
            return cache.addAll([offlinePage]);
        })
        .catch(error => {
            debug(error);
        })
}

/**
 * Install Service Worker
 */
 self.addEventListener('install', event => {
    debug("Installing Service Worker");
    event.waitUntil(
        cacheOfflinePage()
        .then( () => self.skipWaiting() )
    );
});

/**
 * Activate Service Worker
 */
self.addEventListener('activate', event => {
    debug("Activating Service Worker");
    event.waitUntil(
        clearOldCaches()
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    let request = event.request;

    // Ignore non-GET requests
    if (request.method !== 'GET') {
        debug("Ignoring non GET request");
        return;
    }

    event.respondWith(
        caches.match(request)
            .then(response => {
                // CACHE
                debug("Fetching " + request.url)

                if (response) {
                    debug("Found in cache: " + request.url);
                }

                return response || fetch(request)
                    .then( response => {
                        // NETWORK
                        debug("Going to network: " + request.url);
                        if (response && response.ok) {
                            debug("Saving in cache: " + request.url);
                            let copy = response.clone();
                            caches.open(offlineCache)
                                .then( cache => cache.put(request, copy) );
                        }
                        return response;
                    })
                    .catch( error => {
                        // OFFLINE
                        debug("Offline and no cache for: " + request.url + ": " + error);
                        if (request.mode == 'navigate') {
                            debug("Showing offline page")
                            return caches.match(offlinePage);
                        } else if (request.headers.get('Accept').indexOf('image') !== -1) {
                            return new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>', {headers: {'Content-Type': 'image/svg+xml'}});
                        }
                    });
            })
      );
});

function debug(message) {
    if (debugMode) {
        console.log(message);
    }
}
