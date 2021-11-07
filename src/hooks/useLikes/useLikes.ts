import useSWR from "swr";

import { fetcher } from "@/lib/fetcher";

export const useLikes = (pageId: string) => {
  const key = `/api/likes/${pageId}`;

  const { data, error, mutate } = useSWR(key, fetcher);

  return {
    error,
    mutate,
    isLoading: !error && !data,
    isError: !!error,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    likes: isNaN(data?.likes) ? 0 : Number(data?.likes),
  };
};
