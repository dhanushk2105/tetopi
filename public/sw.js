const CACHE_NAME = 'tetopi-v1';
const ASSETS = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Add your GIF paths
  '/assets/1.gif',
  '/assets/2.gif',
  '/assets/3.gif',
  '/assets/4.gif',
  '/assets/5.gif',
  '/assets/6.gif',
  '/assets/7.gif',
  // Add your audio files
  '/audio/background.mp3',
  '/audio/complete.mp3',
  // Add fonts
  'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});