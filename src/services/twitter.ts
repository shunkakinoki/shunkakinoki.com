import { TwitterApi } from "twitter-api-v2";

// -----------------------------------------------------------------------------
// Client
// -----------------------------------------------------------------------------

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const twitterClient = new TwitterApi(process.env.TWITTER_API_KEY!);

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

export const getFollowerCount = async () => {
  const user = await twitterClient.v2.userByUsername("shunkakinoki");
  return user?.data?.public_metrics?.followers_count;
};
