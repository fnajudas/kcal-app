/**
 * Service Worker for Kalkulator Kalori PWA
 * Enables offline functionality and auto-updates
 */

// =====================================================
// PENTING: Naikkan versi ini setiap kali ada update!
// =====================================================
const APP_VERSION = '1.0.0';
const CACHE_NAME = `kcal-calculator-v${APP_VERSION}`;

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/js/calculator.js',
    '/js/calorie-api.js',
    '/js/foods-db.js',
    '/js/storage.js',
    '/manifest.json',
    '/icons/icon.svg',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log(`[SW] Installing version ${APP_VERSION}...`);
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('[SW] Installed successfully');
                // Skip waiting to activate immediately
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches and notify clients
self.addEventListener('activate', (event) => {
    console.log(`[SW] Activating version ${APP_VERSION}...`);
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name.startsWith('kcal-calculator-') && name !== CACHE_NAME)
                        .map((name) => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                console.log('[SW] Activated successfully');
                // Take control of all clients immediately
                return self.clients.claim();
            })
            .then(() => {
                // Notify all clients about the update
                return self.clients.matchAll().then((clients) => {
                    clients.forEach((client) => {
                        client.postMessage({
                            type: 'SW_UPDATED',
                            version: APP_VERSION
                        });
                    });
                });
            })
    );
});

// Fetch event - Network First for HTML, Cache First for assets
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip API requests (CalorieNinjas)
    if (event.request.url.includes('api.calorieninjas.com')) {
        return;
    }

    const isHTMLRequest = event.request.headers.get('accept')?.includes('text/html');
    const isNavigationRequest = event.request.mode === 'navigate';

    if (isHTMLRequest || isNavigationRequest) {
        // Network First strategy for HTML (always get fresh content)
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Cache the fresh response
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                    return response;
                })
                .catch(() => {
                    // Fallback to cache when offline
                    return caches.match(event.request)
                        .then((cachedResponse) => {
                            return cachedResponse || caches.match('/index.html');
                        });
                })
        );
    } else {
        // Cache First strategy for assets (CSS, JS, images)
        event.respondWith(
            caches.match(event.request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        // Return cached version, but also fetch fresh in background
                        fetch(event.request).then((response) => {
                            if (response && response.status === 200) {
                                caches.open(CACHE_NAME).then((cache) => {
                                    cache.put(event.request, response);
                                });
                            }
                        }).catch(() => {});
                        return cachedResponse;
                    }

                    // Fetch from network
                    return fetch(event.request)
                        .then((response) => {
                            if (!response || response.status !== 200) {
                                return response;
                            }

                            const responseToCache = response.clone();
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                            return response;
                        });
                })
        );
    }
});

// Handle messages from clients
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: APP_VERSION });
    }
});

// Check for updates periodically (every hour when app is open)
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'check-updates') {
        event.waitUntil(checkForUpdates());
    }
});

async function checkForUpdates() {
    try {
        const response = await fetch('/sw.js', { cache: 'no-store' });
        if (response.ok) {
            self.registration.update();
        }
    } catch (error) {
        console.log('[SW] Update check failed:', error);
    }
}
