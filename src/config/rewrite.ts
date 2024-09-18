// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

export enum RewriteConfig {
  Tweets = "/posts",
}

// Create an array of the enum entries
export const rewriteConfig = Object.entries(RewriteConfig).map(
  ([name, href]) => ({
    name,
    href,
  }),
);
