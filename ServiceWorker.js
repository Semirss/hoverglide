const cacheName = "SS-Production-Havoc Glide-0.1";
const contentToCache = [
    "Build/9938238b2f9084480cd101c914faba2f.loader.js",
    "Build/574b451eab7d56edd978fdb05cc477ec.framework.js.unityweb",
    "Build/15d79da1392ea0c532878853695eaa78.data.unityweb",
    "Build/5e57784ec2baf2469fa600760121d676.wasm.unityweb",
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
