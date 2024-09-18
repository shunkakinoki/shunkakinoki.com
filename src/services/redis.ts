// Copyright 2023-2024 Shun Kakinoki.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// -----------------------------------------------------------------------------
// Client
// -----------------------------------------------------------------------------

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN,
});

// Create a new ratelimiter
export const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(1, "30 s"),
  prefix: "@upstash/ratelimit",
  analytics: true,
});

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

export const createEmailId = async (id: string, emailId: string) => {
  // Store the email ID in Redis.
  await redis.set(`emails:${id}`, emailId);
  return {
    emailId: emailId,
  };
};

export const getEmailId = async (id: string) => {
  // Retrieve the email ID from Redis.
  const emailId = await redis.get(`emails:${id}`);
  return {
    emailId: emailId,
  };
};

export const getTotalViewCount = async () => {
  // Retrieve the total view count from Redis.
  const totalViews = await redis.get<number>("views:total");
  return {
    totalViews: totalViews,
  };
};

export const getTotalVisitorCount = async () => {
  // Retrieve the total visitor count from Redis.
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
