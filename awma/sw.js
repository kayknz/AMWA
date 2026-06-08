const CACHE_NAME = 'amwa-v2';
const STATIC_CACHE = 'amwa-static-v2';
const IMAGE_CACHE = 'amwa-images-v2';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/objectives.txt',
  '/logo.jpg',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

const IMAGE_ASSETS = [
  '/a1.jpg',
  '/a2.jpg',
  '/a3.jpg',
  '/a4.jpg',
  '/a5.jpg',
  '/imm.jpg',
  '/amwajazira.jpg',
  '/amwapro.jpg',
  '/amwasumaya.png',
  '/amwadesire.png'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS)),
      caches.open(IMAGE_CACHE).then(cache => cache.addAll(IMAGE_ASSETS))
    ]).then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== STATIC_CACHE && cacheName !== IMAGE_CACHE)
          .map(cacheName => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Handle different types of requests
  if (event.request.destination === 'image') {
    // Cache-first for images
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request).then(networkResponse => {
          if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches.open(IMAGE_CACHE).then(cache => cache.put(event.request, responseClone));
          }
          return networkResponse;
        }))
    );
  } else if (event.request.destination === 'font' || url.pathname.includes('fonts.googleapis.com')) {
    // Cache-first for fonts
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  } else {
    // Network-first for HTML and API calls, with cache fallback
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          // Cache successful responses
          if (networkResponse.ok && event.request.method === 'GET') {
            const responseClone = networkResponse.clone();
            caches.open(STATIC_CACHE).then(cache => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          // Fallback to cache
          return caches.match(event.request);
        })
    );
  }
});

// Handle background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle any pending form submissions
  console.log('Background sync triggered');
}