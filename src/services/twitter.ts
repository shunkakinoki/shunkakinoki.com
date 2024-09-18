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
