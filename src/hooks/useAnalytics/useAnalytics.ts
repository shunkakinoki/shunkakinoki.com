import useSWR from "swr";

import { fetcher } from "@/lib/fetcher";

export const analytics = [
  "newsletter",
  "github",
  "twitter",
  "views",
  "likes",
] as const;

export type Analytics = typeof analytics[number];

export const useAnalytics = (analytics: Analytics) => {
  const key = `/api/analytics/${analytics}`;

  const { data, error } = useSWR(key, fetcher);

  return {
    error,
    isLoading: !error && !data,
    isError: !!error,
    number: Number(data?.number),
  };
};
