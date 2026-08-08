// Service Worker for 考研备考助手
// Handles push notifications and offline caching

const CACHE_NAME = 'kaoyan-helper-v19';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/%E6%95%B0%E5%AD%A6%E4%B8%80_110%E5%88%86%E8%80%83%E7%82%B9%E7%94%BB%E9%A2%98%E7%AD%9B%E9%80%89%E8%A1%A8.pdf',
  '/%E6%B5%99%E5%B7%A5%E5%A4%A7828_777%E5%88%B7%E9%A2%98%E7%AD%9B%E9%80%89%E6%B8%85%E5%8D%95.pdf',
  '/880_%E8%B7%B3%E8%BF%87%E6%B8%85%E5%8D%95.pdf'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Listen for notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        return clients.openWindow('/');
      })
  );
});
