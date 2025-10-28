// Utility functions to handle caching issues

// Generate cache busting timestamp
export const getCacheBuster = () => `?t=${Date.now()}&r=${Math.random()}`;

// Force reload the page with cache busting
export const forceReload = () => {
  // Clear all possible caches
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        caches.delete(name);
      });
    });
  }
  
  // Force reload with cache busting
  window.location.href = window.location.pathname + getCacheBuster();
};

// Fetch with aggressive no-cache headers
export const fetchWithNoCache = async (url, options = {}) => {
  const cacheBuster = getCacheBuster();
  const urlWithCacheBuster = url.includes('?') ? `${url}&${cacheBuster.slice(1)}` : `${url}${cacheBuster}`;
  
  return fetch(urlWithCacheBuster, {
    ...options,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'If-Modified-Since': '0',
      'If-None-Match': 'no-match-for-this',
      ...options.headers
    }
  });
};

// Add timestamp to current URL to force refresh
export const addTimestampToUrl = () => {
  const url = new URL(window.location);
  url.searchParams.set('t', Date.now());
  url.searchParams.set('r', Math.random());
  window.history.replaceState({}, '', url);
};
