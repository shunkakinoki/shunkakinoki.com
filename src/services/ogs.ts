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
import ogs from "open-graph-scraper";

// -----------------------------------------------------------------------------
// Services
// -----------------------------------------------------------------------------

export const getOpenGraphData = async ({ url }: { url: string }) => {
  // ---------------------------------------------------------------------------
  // Cache
  // ---------------------------------------------------------------------------

  "use cache";

  cacheLife("minutes");

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const ogData = await ogs({ url: url });

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  if (!ogData.error) {
    return JSON.stringify(ogData);
  }

  // Throw an error if the URL is not valid
  throw new Error("Invalid URL");
};
