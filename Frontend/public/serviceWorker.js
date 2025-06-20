// Service Worker for Viraloab PWA
const CACHE_NAME = 'viraloab-cache-v1';
const RUNTIME_CACHE = 'viraloab-runtime-v1';
const FORM_STORE_NAME = 'pendingContactForms';
const DB_NAME = 'viraloab-offline-storage';
const DB_VERSION = 1;

// API URL depending on environment (to be replaced during build)
const API_URL = self.VITE_API_URL || 'https://viraloabbackend.vercel.app';

// Resources to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/serviceWorker.js',
  '/images/logo.svg',
  '/images/hero-bg.svg',
  '/images/fallback.svg',
  '/icons/icon-192x192.svg',
  '/offline.html'
];

// Install event - precache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Pre-caching assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => !currentCaches.includes(cacheName))
          .map((cacheName) => {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests like analytics
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // Skip Chrome extensions
  if (event.request.url.includes('chrome-extension')) {
    return;
  }
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // For navigation requests (HTML pages), use network-first strategy
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone response for caching
          const clonedResponse = response.clone();
          
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(event.request, clonedResponse);
          });
          
          return response;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(event.request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              
              // If not in cache, serve the offline page
              return caches.match('/offline.html');
            });
        })
    );
    return;
  }
  
  // For other requests, use cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // If not in cache, fetch from network
        return caches.open(RUNTIME_CACHE)
          .then((cache) => {
            return fetch(event.request)
              .then((response) => {
                // Only cache valid responses
                if (!response || response.status !== 200 || response.type !== 'basic') {
                  return response;
                }
                
                // Clone response for caching
                const clonedResponse = response.clone();
                cache.put(event.request, clonedResponse);
                
                return response;
              })
              .catch((err) => {
                console.error('Fetch error:', err);
                
                // For image requests, return a fallback image
                if (event.request.destination === 'image') {
                  return caches.match('/images/fallback.svg');
                }
                
                return new Response('Network error occurred', {
                  status: 408,
                  headers: { 'Content-Type': 'text/plain' }
                });
              });
          });
      })
  );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

// Open IndexedDB database
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(FORM_STORE_NAME)) {
        db.createObjectStore(FORM_STORE_NAME, { autoIncrement: true });
      }
    };
  });
}

// Get all stored form data
function getStoredFormData() {
  return new Promise((resolve, reject) => {
    openDB().then(db => {
      const transaction = db.transaction(FORM_STORE_NAME, 'readonly');
      const store = transaction.objectStore(FORM_STORE_NAME);
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    }).catch(reject);
  });
}

// Remove specific form data entries
function removeFormEntries(keys) {
  return new Promise((resolve, reject) => {
    openDB().then(db => {
      const transaction = db.transaction(FORM_STORE_NAME, 'readwrite');
      const store = transaction.objectStore(FORM_STORE_NAME);
      
      let completed = 0;
      let success = true;
      
      keys.forEach(key => {
        const request = store.delete(key);
        
        request.onsuccess = () => {
          completed++;
          if (completed === keys.length) resolve(success);
        };
        
        request.onerror = () => {
          success = false;
          completed++;
          if (completed === keys.length) resolve(success);
        };
      });
      
      // If there are no keys to delete
      if (keys.length === 0) resolve(true);
    }).catch(reject);
  });
}

// Function to sync contact form data
async function syncContactForm() {
  try {
    // Get stored contact form submissions
    const formEntries = await getStoredFormData();
    
    if (!formEntries || formEntries.length === 0) {
      return;
    }
    
    // Process each pending submission
    const successfulKeys = [];
    
    for (let i = 0; i < formEntries.length; i++) {
      const formEntry = formEntries[i];
      
      try {
        // Try to submit the form data
        const response = await fetch(`${API_URL}/api/contact`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'X-Offline-Submission': 'true'
          },
          body: JSON.stringify(formEntry.data)
        });
        
        if (response.ok) {
          // If successful, add to list for removal
          successfulKeys.push(formEntry.id || i);
          
          // Notify any open clients about the successful submission
          const clients = await self.clients.matchAll({ type: 'window' });
          clients.forEach(client => {
            client.postMessage({
              type: 'OFFLINE_SUBMISSION_COMPLETE',
              success: true,
              timestamp: new Date().toISOString()
            });
          });
        } else {
          // Log error details
          const errorData = await response.json().catch(() => ({}));
          console.error('Form submission failed:', response.status, errorData);
          
          // If this is a permanent error (400 range), consider removing the entry
          if (response.status >= 400 && response.status < 500) {
            successfulKeys.push(formEntry.id || i); // Remove bad submissions
          }
        }
      } catch (err) {
        console.error('Failed to sync form submission:', err);
        // Network errors will be retried on next sync
      }
    }
    
    // Remove successful submissions
    if (successfulKeys.length > 0) {
      await removeFormEntries(successfulKeys);
    }
    
    return successfulKeys.length > 0;
  } catch (err) {
    console.error('Background sync error:', err);
    return false;
  }
} 