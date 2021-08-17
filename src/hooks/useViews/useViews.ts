import useSWR from "swr";

import { fetcher } from "@/lib/fetcher";

export const useViews = (id: string) => {
  const key = `/api/views/${id}`;

  const { data, error } = useSWR(key, fetcher);

  return {
    error,
    isLoading: !error && !data,
    isError: !!error,
    views: data.views,
  };
};
