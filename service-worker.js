const CACHE='road-to-90-v7';
const STATIC=['/','/index.html','/manifest.webmanifest','/icons/icon-192.png','/icons/icon-512.png'];
self.addEventListener('install', e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC)));self.skipWaiting();});
self.addEventListener('activate', e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch', e=>{
  const u=new URL(e.request.url);
  if(u.pathname.startsWith('/api/')) return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
