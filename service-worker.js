
self.addEventListener('install', event => {
event.waitUntil(
caches.open('pro-revision').then(cache => {
return cache.addAll(['./','./index.html','./css/style.css','./js/app.js','./data/questions.json']);
})
);
});

self.addEventListener('fetch', event => {
event.respondWith(
caches.match(event.request).then(response => response || fetch(event.request))
);
});
