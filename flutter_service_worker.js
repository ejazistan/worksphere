'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "c9e1ae3a702608e8201ba6247e1a2775",
"assets/AssetManifest.bin.json": "68d819cff3f3df99f4f2d33954660ae3",
"assets/AssetManifest.json": "a9442464ccbb79f1cc3edffb69071669",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/fonts/MaterialIcons-Regular.otf": "75cc69156018ee5cedcbc3ea1346605b",
"assets/NOTICES": "4d650f7ac3d39611ed694609e2835a2d",
"assets/resources/images/background.png": "4c6394df3a5f47150af166571a4157d7",
"assets/resources/images/client.png": "27add16bcc36d1f3235f4a80370eac15",
"assets/resources/images/Ejaz.png": "db76f7406f7acf45de9b26254e4878df",
"assets/resources/images/Ejazz.png": "f09ab45f5ae87c3d2d8a33a95be1953f",
"assets/resources/images/farid.jpg": "88d07a92190b33b13dc3383c64c0a607",
"assets/resources/images/freelancer.png": "ca77c03e16137136541f040c072bf38a",
"assets/resources/images/freelancer1.png": "7bdd21271ac53990c07a5b978d09dd0a",
"assets/resources/images/icon.jpg": "424ab99ddfc290357f0d5aa65f90a62c",
"assets/resources/images/logo.png": "b2d57b040d5d9e8297da77f8424f023c",
"assets/resources/images/logo1.png": "f49178f29675be2abbe03d5264ac935b",
"assets/resources/images/Niaz.jpg": "a9a6d241d2b68ac9913154e7733ee42f",
"assets/resources/images/Owais.jpg": "417c267c35bf2757f8d1bfba38536dda",
"assets/resources/images/sheharyar.jpg": "888b6bda2295aed42aa51c1824832e95",
"assets/resources/images/splashIcon.png": "f828ef183a0b33ff5de65b69c8fd291a",
"assets/resources/images/user1.png": "467abebc88844e84bead4e5e064439f9",
"assets/resources/images/Zeeshan.jpg": "656596dbdb75b7fe86a602ac33556f96",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "5fda3f1af7d6433d53b24083e2219fa0",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/chromium/canvaskit.js": "87325e67bf77a9b483250e1fb1b54677",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/skwasm.js": "9fa2ffe90a40d062dd2343c7b84caf01",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "4db8e49f5c3fe85527991041120830fe",
"flutter.js": "f31737fb005cd3a3c6bd9355efd33061",
"flutter_bootstrap.js": "10d9d2158dda7303f86e83b0cc00563a",
"icons/Icon-192.png": "bf80bc2c4507ca61462bab86ebe3ff16",
"icons/Icon-512.png": "0a607e8caf13791d0344f0fce6c89339",
"icons/Icon-maskable-192.png": "bf80bc2c4507ca61462bab86ebe3ff16",
"icons/Icon-maskable-512.png": "0a607e8caf13791d0344f0fce6c89339",
"index.html": "62e2f0b6625422df8e0743d12ded5043",
"/": "62e2f0b6625422df8e0743d12ded5043",
"main.dart.js": "dd597b9085ba93f79032e5906237b40d",
"manifest.json": "d57674e7592d12821ff04b85f8b1b30c",
"splash/img/dark-1x.png": "2795950fe152b3bf04e02d3afa5bde07",
"splash/img/dark-2x.png": "04fc37bd916c3d9c9994bf0d0f77e2a9",
"splash/img/dark-3x.png": "5eaeb624d2075fcca5cfdc47d6fc9198",
"splash/img/dark-4x.png": "3155babd427be3f7e5e0a636e3f4ddea",
"splash/img/light-1x.png": "2795950fe152b3bf04e02d3afa5bde07",
"splash/img/light-2x.png": "04fc37bd916c3d9c9994bf0d0f77e2a9",
"splash/img/light-3x.png": "5eaeb624d2075fcca5cfdc47d6fc9198",
"splash/img/light-4x.png": "3155babd427be3f7e5e0a636e3f4ddea",
"version.json": "76175cd26dfc20e28a5dca214af3ebad"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
