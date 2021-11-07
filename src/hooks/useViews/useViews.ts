import useSWR from "swr";

import { fetcher } from "@/lib/fetcher";

export const useViews = (pageId: string) => {
  const key = `/api/views/${pageId}`;

  const { data, error, mutate } = useSWR(key, fetcher);

  return {
    error,
    mutate,
    isLoading: !error && !data,
    isError: !!error,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    views: isNaN(data?.views) ? 0 : Number(data?.views),
  };
};
