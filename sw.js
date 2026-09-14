// Service Worker for 考研备考助手
// Handles push notifications and offline caching
// v49 (9.14): 二刷顺序修正——先捡地基（第1讲极限→第3/4讲微分→第2讲数列→第5讲几何应用）
//             再吃分值大的（第9讲积分计算→第8/14/15讲→第13讲多元微分→第16讲级数→第18讲多元积分）
//             9.14-9.30 每日上午块写明具体讲次；中值定理挪到9.30后第一问专项

const CACHE_NAME = 'kaoyan-helper-v49';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
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
