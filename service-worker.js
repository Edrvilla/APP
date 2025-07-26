// A unique name for our cache
const CACHE_NAME = 'snf-survey-cache-v1';

// The list of files to cache. 
// It's important to include the main HTML file and any other essential assets.
// I'm assuming your HTML file is named 'index.html'. If not, change it here.
const urlsToCache = [
  '/',
  'index.html', 
];

// Install event: This is triggered when the service worker is first installed.
self.addEventListener('install', event => {
  // We wait until the installation is complete.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Add all the specified files to the cache.
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: This is triggered for every network request made by the page.
self.addEventListener('fetch', event => {
  event.respondWith(
    // Check if the requested resource is in our cache.
    caches.match(event.request)
      .then(response => {
        // If the resource is in the cache, return it.
        if (response) {
          return response;
        }
        // If the resource is not in the cache, fetch it from the network.
        return fetch(event.request);
      }
    )
  );
});
