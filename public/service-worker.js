// Add files to cache
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/index.js',
    '/manifest.webmanifest',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/db.js'
];

// Static & Data cahce
const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v1';

// Install service worker
self.addEventListener('install', function (evt) {
    evt.waitUntil(caches.open(CACHE_NAME).then(cache => {
        console.log('Your files were pre-cached successfully!');
        return cache.addAll(FILES_TO_CACHE);
    }));

    self.skipWaiting();
});

// Active service worker

// Listen for fetches to api

// Serve static assets