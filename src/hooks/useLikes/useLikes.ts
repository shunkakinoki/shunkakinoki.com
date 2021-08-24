import useSWR from "swr";

import { fetcher } from "@/lib/fetcher";

export const useLikes = (id: string) => {
  const key = `/api/likes/${id}`;

  const { data, error, mutate } = useSWR(key, fetcher);

  return {
    error,
    mutate,
    isLoading: !error && !data,
    isError: !!error,
    likes: isNaN(data?.likes) ? 0 : Number(data?.likes),
  };
};
