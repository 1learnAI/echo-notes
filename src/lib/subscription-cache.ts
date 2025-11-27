// Cache subscription data to avoid excessive Stripe API calls
interface CachedSubscription {
  plan: string;
  timestamp: number;
}

const CACHE_KEY = 'subscription_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getSubscriptionCache = (): CachedSubscription | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const data: CachedSubscription = JSON.parse(cached);
    const isExpired = Date.now() - data.timestamp > CACHE_DURATION;
    
    if (isExpired) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    
    return data;
  } catch {
    return null;
  }
};

export const setSubscriptionCache = (plan: string): void => {
  try {
    const data: CachedSubscription = {
      plan,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error setting subscription cache:', error);
  }
};

export const clearSubscriptionCache = (): void => {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (error) {
    console.error('Error clearing subscription cache:', error);
  }
};
