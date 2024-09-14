// import { TwitterApi } from "twitter-api-v2";

import { unstable_cache } from "next/cache";

// -----------------------------------------------------------------------------
// Client
// -----------------------------------------------------------------------------

// const _twitterClient = new TwitterApi(process.env.TWITTER_API_KEY!);

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

export const getFollowerCount = async () => {
  const metrics = await fetch(
    "https://api2.typefully.com/metric/followers-count/?screen_name=shunkakinoki",
  ).then((res) => res.json());
  return metrics?.value;
};

export const getLatestPublishedTweetCount = async () => {
  const metrics = await fetch(
    "https://api2.typefully.com/metric/published-tweets-count/?screen_name=shunkakinoki",
  ).then((res) => res.json());
  return metrics?.value;
};

export const getImpressionCount = async () => {
  const metrics = await fetch(
    "https://api2.typefully.com/metric/impressions/?screen_name=shunkakinoki",
  ).then((res) => res.json());
  return metrics?.value;
};

// -----------------------------------------------------------------------------
// Cached
// -----------------------------------------------------------------------------

export const getCachedFollowerCount = unstable_cache(
  getFollowerCount,
  ["twitter-follower-count"],
  {
    revalidate: 300,
  },
);

export const getCachedLatestPublishedTweetCount = unstable_cache(
  getLatestPublishedTweetCount,
  ["twitter-latest-published-tweet-count"],
  {
    revalidate: 300,
  },
);

export const getCachedImpressionCount = unstable_cache(
  getImpressionCount,
  ["twitter-impression-count"],
  {
    revalidate: 300,
  },
);
