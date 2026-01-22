const cacheName = "SS-Production-Havoc Glide-0.1";
const contentToCache = [
    "Build/036bd08001fbddeb9547e655e9ed8873.loader.js",
    "Build/84f62efbc354b71f13aea632d5f9553e.framework.js.unityweb",
    "Build/132deafd4a9b4c69c799ad08f2247548.data.unityweb",
    "Build/36a0383c91dfb954f3972321ec3c0798.wasm.unityweb",
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
