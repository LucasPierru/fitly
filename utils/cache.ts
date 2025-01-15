const cache = new Map();

export const getFromCache = (key: string) => {
  const cached = cache.get(key);
  if (!cached) return null;

  const { value, expiry } = cached;
  if (Date.now() > expiry) {
    cache.delete(key); // Expired data
    return null;
  }
  return value;
};

export const setToCache = (key: string, value: unknown, ttl = 86400000) => {
  // Default TTL: 24 hours
  cache.set(key, { value, expiry: Date.now() + ttl });
};

export const clearCache = () => {
  cache.clear();
};

setInterval(clearCache, 86400000);
