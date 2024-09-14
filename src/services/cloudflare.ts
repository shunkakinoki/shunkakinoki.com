import { unstable_cache } from "next/cache";

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

export const getCloudflareAnalytics = async () => {
  const url = "https://api.cloudflare.com/client/v4/graphql";
  const payload = {
    operationName: "RumAnalyticsTimeseriesBydatetimeHourGroupedByall",
    variables: {
      accountTag: "121992ad6957cb0370fbda3384957564",
      filter: {
        // biome-ignore lint/style/useNamingConvention: <explanation>
        AND: [
          {
            // biome-ignore lint/style/useNamingConvention: <explanation>
            datetime_geq: new Date(
              Date.now() - 1000 * 60 * 60 * 24,
            ).toISOString(),
            // biome-ignore lint/style/useNamingConvention: <explanation>
            datetime_leq: new Date().toISOString(),
          },
          {
            // biome-ignore lint/style/useNamingConvention: <explanation>
            OR: [
              {
                siteTag: "13e93ffc39704367947cd2495738e7a1",
              },
            ],
          },
          {
            bot: 0,
          },
        ],
      },
    },
    query: `query RumAnalyticsTimeseriesBydatetimeHourGroupedByall($accountTag: string, $filter: AccountRumPageloadEventsAdaptiveGroupsFilter_InputObject) {
      viewer {
        accounts(filter: {accountTag: $accountTag}) {
          series: rumPageloadEventsAdaptiveGroups(limit: 5000, filter: $filter) {
            count
            avg {
              sampleInterval
              __typename
            }
            sum {
              visits
              __typename
            }
            dimensions {
              ts: datetimeHour
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
    }`,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // biome-ignore lint/style/useNamingConvention: <explanation>
      Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data?.data?.viewer?.accounts?.[0]?.series?.[0]?.sum?.visits;
};

// -----------------------------------------------------------------------------
// Cached
// -----------------------------------------------------------------------------

export const getCachedCloudflareAnalytics = unstable_cache(
  getCloudflareAnalytics,
  ["cloudflare-analytics"],
  {
    revalidate: 300,
  },
);
