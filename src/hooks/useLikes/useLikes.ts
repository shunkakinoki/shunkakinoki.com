import useSWR from "swr";

import { fetcher } from "@/lib/fetcher";

export const useLikes = (id: string) => {
  const key = `/api/likes/${id}`;

  const { data, error } = useSWR(key, fetcher);

  return {
    error,
    isLoading: !error && !data,
    isError: !!error,
    likes: Number(data?.likes),
  };
};
