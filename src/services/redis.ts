import { Redis } from "@upstash/redis";

// -----------------------------------------------------------------------------
// Client
// -----------------------------------------------------------------------------

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN,
});

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

export const getTotalViewCount = async () => {
  const totalViews = await redis.get<number>("views:total");
  return {
    totalViews: totalViews,
  };
};

export const getTotalVisitorCount = async () => {
  const totalVisitorCount = await redis.get<number>("visitors:total");
  return {
    totalVisitorCount: totalVisitorCount,
  };
};

export const incrementViewCount = async (id: string) => {
  // Increment post view count.
  const views = await redis.hincrby("views", id, 1);

  // Increment total view count.
  const totalViews = await redis.incr("views:total");

  return {
    views: views,
    totalViews: totalViews,
  };
};

export const incrementVisitorCount = async (
  ip: string,
  id: string | null = null,
) => {
  // Hash the IP address using SHA-256.
  const buffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(ip),
  );
  const hash = Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Initialize variables to track if the view is new.
  let isNewPost = false;
  let isNewTotal = false;

  // Prepare redis commands
  const redisCommands = redis.multi();

  // Check if the total view is a duplicate (same IP address within the last 24 hours).
  redisCommands.set(`visitor_deduplicates:total:${hash}`, true, {
    nx: true,
    ex: 86_400,
  });

  if (id !== null) {
    // Check if the view is a duplicate for a specific post (same IP address on the post within the last 24 hours).
    redisCommands.set(`visitor_deduplicates:${id}:${hash}`, true, {
      nx: true,
      ex: 86_400,
    });
  }

  // Execute redis commands
  const results = await redisCommands.exec();
  console.info(results);

  // Check if the total view is new.
  isNewTotal = results[0] === "OK";
  if (id !== null) {
    // Check if the post view is new.
    isNewPost = results[1] === "OK";
  }

  // Increment post visitor count if `isNewPost` is true and id is provided.
  let visitors = 0;
  if (id !== null) {
    visitors = await redis.hincrby("visitors", id, isNewPost ? 1 : 0);
  }

  // Increment total visitor count if `isNewTotal` is true.
  const totalVisitors = await redis.incrby(
    "visitors:total",
    isNewTotal ? 1 : 0,
  );

  return {
    visitors: visitors === 0 ? totalVisitors : visitors,
    totalVisitors: totalVisitors,
  };
};
