// import { TwitterApi } from "twitter-api-v2";

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
