const cacheName = "SS-Production-Havoc Glide-0.1";
const contentToCache = [
    "Build/ee3655d88b37ce4f1dfd69c1c8055b05.loader.js",
    "Build/574b451eab7d56edd978fdb05cc477ec.framework.js.unityweb",
    "Build/c742457faaa80d495e7a571d743b723e.data.unityweb",
    "Build/610c13294c5cbf284b1669e80b494318.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
