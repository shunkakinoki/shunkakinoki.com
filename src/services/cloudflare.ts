// Copyright 2023-2024 Shun Kakinoki.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { unstable_cacheLife as cacheLife } from "next/cache";

// -----------------------------------------------------------------------------
// Service
// -----------------------------------------------------------------------------

export const getCloudflareAnalytics = async () => {
  // ---------------------------------------------------------------------------
  // Cache
  // ---------------------------------------------------------------------------

  "use cache";

  cacheLife("hours");

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data?.data?.viewer?.accounts?.[0]?.series?.[0]?.sum?.visits;
};
