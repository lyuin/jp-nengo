/* 圏外でも起動できるようにするための Service Worker。
   方式はネットワーク優先・キャッシュはフォールバック。
   キャッシュ優先にすると古い版が表示され続けるため、あえて採らない。 */

const CACHE = 'nengo-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-32.png',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
];

/* addAll は1つ失敗すると全部失敗するので、1件ずつ入れて取りこぼしを許容する */
self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await Promise.all(ASSETS.map(u => c.add(u).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;
  if(new URL(req.url).origin !== self.location.origin) return;

  e.respondWith((async () => {
    try{
      const res = await fetch(req);
      if(res && res.ok){
        const copy = res.clone();                 /* 本文を読む前に複製しておく */
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }catch{
      /* 圏外。キャッシュ、なければ画面そのものを返す */
      return (await caches.match(req)) || (await caches.match('./index.html'));
    }
  })());
});
