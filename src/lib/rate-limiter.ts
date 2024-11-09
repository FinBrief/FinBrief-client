import { getUser } from "@/actions/getUser";
import NodeCache from "node-cache";

// In-memory cache
const rateLimitCache = new NodeCache();
const cooldownPeriod = 10 * 1000; // 10 secs

export async function checkRateLimit() {
  const user = await getUser();
  const userId = user || 'anonymous';
  
  const currentTime = Math.floor(Date.now());
  const lastRequestTime = rateLimitCache.get<number>(userId);

  if (lastRequestTime) {
    const timeElapsed = currentTime - lastRequestTime;
    if (timeElapsed < cooldownPeriod) {
      return {
        success: false,
        remainingTime: cooldownPeriod - timeElapsed
      };
    }
  }

  rateLimitCache.set(userId, currentTime);
  return { success: true, remainingTime: 0 };
}