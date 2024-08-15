import { Redis } from "@upstash/redis";

// -----------------------------------------------------------------------------
// Client
// -----------------------------------------------------------------------------

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
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

export const incrementVisitorCount = async (id: string, ip: string) => {
  // Hash the IP address using SHA-256.
  const buffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(ip),
  );
  const hash = Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Check if the view is a duplicate (same IP address on the post within the
  // last 24 hours).
  const results = await redis
    .multi()
    .set(`view_deduplicates:${id}:${hash}`, true, {
      nx: true,
      ex: 86_400,
    })
    .set(`visitor_deduplicates:total:${hash}`, true, {
      nx: true,
      ex: 86_400,
    })
    .exec();

  // Flag to indicate if the post is new.
  const isNewPost = results[0] === "OK";
  const isNewTotal = results[1] === "OK";

  // Increment post visitor count if `isNew` is true.
  const visitors = await redis.hincrby("visitors", id, isNewPost ? 1 : 0);

  // Increment total visitor count if `isNew` is true.
  const totalVisitors = await redis.incrby(
    "visitors:total",
    isNewTotal ? 1 : 0,
  );

  return { visitors: visitors, totalVisitors: totalVisitors };
};
