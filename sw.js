// Service Worker：离线缓存核心资源（双击 file:// 打开时自动跳过注册）
const CACHE = "cnx-island-v4";
const ASSETS = [
  "index.html",
  "css/style.css",
  "js/data/unit-meta.js",
  "js/data/questions-ma.js",
  "js/data/questions-cn.js",
  "js/data/questions-cn2.js",
  "js/data/questions-en.js",
  "js/data/cards.js",
  "js/data/dressup.js",
  "js/data/achievements.js",
  "js/state.js",
  "js/character.js",
  "js/engine.js",
  "js/views.js",
  "js/main.js",
  "manifest.webmanifest"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      if (res.ok && new URL(e.request.url).origin === location.origin) {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return res;
    }).catch(() => caches.match("index.html")))
  );
});
