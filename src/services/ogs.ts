import { unstable_cache } from "next/cache";
import ogs from "open-graph-scraper";

export const getCachedOpenGraphData = unstable_cache(
  async ({ url }: { url: string }) => {
    const ogData = await ogs({ url: url });
    if (!ogData.error) {
      return JSON.stringify(ogData);
    }
    // Throw an error if the URL is not valid
    throw new Error("Invalid URL");
  },
  ["open-graph-data"],
  { revalidate: false },
);
