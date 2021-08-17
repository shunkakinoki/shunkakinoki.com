import useSWR from "swr";

import { fetcher } from "@/lib/fetcher";

export const useViews = (id: string) => {
  const key = `/api/views/${id}`;

  const { data, error, mutate } = useSWR(key, fetcher);

  return {
    error,
    mutate,
    isLoading: !error && !data,
    isError: !!error,
    views: Number(data?.views),
  };
};
