class CacheManager {
  constructor() {
    this.storage = window.localStorage;
    this.memoryCache = new Map();
  }

  // Memory cache methods
  setMemoryCache(key, value, ttl = 300000) { // 5 minutes default
    this.memoryCache.set(key, {
      value,
      expiry: Date.now() + ttl
    });
  }

  getMemoryCache(key) {
    const item = this.memoryCache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
      this.memoryCache.delete(key);
      return null;
    }
    return item.value;
  }

  // Local storage cache methods
  setStorageCache(key, value, ttl = 86400000) { // 24 hours default
    const item = {
      value,
      expiry: Date.now() + ttl
    };
    this.storage.setItem(key, JSON.stringify(item));
  }

  getStorageCache(key) {
    const item = this.storage.getItem(key);
    if (!item) return null;

    const parsed = JSON.parse(item);
    if (Date.now() > parsed.expiry) {
      this.storage.removeItem(key);
      return null;
    }
    return parsed.value;
  }

  // API response cache
  async cacheApiResponse(url, response, ttl = 300000) {
    const cacheKey = `api_${url}`;
    this.setMemoryCache(cacheKey, response, ttl);
    this.setStorageCache(cacheKey, response, ttl);
  }

  // Clear caches
  clearCache(type = 'all') {
    if (type === 'all' || type === 'memory') {
      this.memoryCache.clear();
    }
    if (type === 'all' || type === 'storage') {
      this.storage.clear();
    }
  }
}

export const cacheManager = new CacheManager();