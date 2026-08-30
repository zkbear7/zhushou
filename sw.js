// Service Worker for 考研备考助手
// Handles push notifications and offline caching
// v27 (8.30): 大整理——学6休1(只周六休息)·作息至21:30·健身提醒移除·每天明天提醒(休息日双卡)·每周复盘(周六/周五晚兜底)·线代=Kira强化·政治=苏一+带刷(听完=一刷)·进度同步(16复盘/线代第5讲✅/828第6章✅→第7章/英语新题型开)

const CACHE_NAME = 'kaoyan-helper-v27';
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
