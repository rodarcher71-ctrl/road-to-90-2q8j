const CACHE='road-to-90-pages-v1';
const STATIC=['./','./index.html','./manifest.webmanifest','./road90-state.json','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  if(url.pathname.endsWith('/road90-state.json')){e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match('./road90-state.json')));return;}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
