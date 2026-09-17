// Service Worker for 考研备考助手
// Handles push notifications and offline caching
// v49 (9.14): 二刷顺序修正——先捡地基（第1讲极限→第3/4讲微分→第2讲数列→第5讲几何应用）
//             再吃分值大的（第9讲积分计算→第8/14/15讲→第13讲多元微分→第16讲级数→第18讲多元积分）
//             9.14-9.30 每日上午块写明具体讲次；中值定理挪到9.30后第一问专项
// v50 (9.15): 高数二刷量级重算——没咋了改"按🔴题型数"(每讲每个🔴题型1道) ≈71道，总量269题≈54h
//             数学面板新增「9.15量级口径」卡（致命变量=每题12min均值）＋修正"顺序"卡为v49执行序
//             880第1章明确定位=10月P2补漏，9月只做验收2-3道
// v51 (9.17): 9.16生日休息 → 二刷整块后移一天（收尾落到10.1，分类真题10.2启动）
//             逐日任务重写：9.17-9.18=第3/4讲微分（含没咋了第2章14道）；第1讲没咋了15道挪到9.20-9.21
//             第4讲习题按书上实际修正（4.10/4.11/4.18 不存在 → 4.6/4.8 + 备选4.5/4.7）
// v52 (9.17): 修正——30讲例题/习题是两套独立编号！第4讲例题排到4.19，4.10/4.11/4.18是例题号
//             第4讲 例题7（+例4.9参数方程）+ 习题2（4.6/4.8）=9题；9.17=15题 / 9.18=17题

const CACHE_NAME = 'kaoyan-helper-v52';
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
