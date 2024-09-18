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

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { validate as uuidValidate } from "uuid";

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// biome-ignore lint/style/useNamingConvention: <explanation>
export function extractValidUUID(inputString: string) {
  const uuidRegex =
    /([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|[0-9a-f]{32})/gi;
  // biome-ignore lint/style/useNamingConvention: <explanation>
  const potentialUUIDs = inputString.match(uuidRegex) || [];

  // biome-ignore lint/style/useNamingConvention: <explanation>
  const firstValidUUID = potentialUUIDs.find((uuid) => {
    // Check if the UUID needs hyphenation
    if (uuid.length === 32) {
      // Reformat to the hyphenated version
      // biome-ignore lint/style/noParameterAssign: <explanation>
      uuid = `${uuid.slice(0, 8)}-${uuid.slice(8, 12)}-${uuid.slice(12, 16)}-${uuid.slice(16, 20)}-${uuid.slice(20)}`;
    }
    return uuidValidate(uuid);
  });

  return firstValidUUID || null;
}
