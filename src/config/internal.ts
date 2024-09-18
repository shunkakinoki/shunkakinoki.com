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

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

export enum InternalConfig {
  Cal = "https://cal.com/shunkakinoki",
  Meeting = "https://cal.com/shunkakinoki/meeting",
  Checklist = "https://shunkakinoki.notion.site/ccf0648ddaab42a38644f209e6cd641f",
  Gym = "https://shunkakinoki.notion.site/8e197940153f418a9f77574f77ab07f7",
  Stats = "https://shunkakinoki.notion.site/6c733d818b8742c8b4c66e01e715a8da",
}

// Create a reversed array of the enum entries
export const internalConfig = Object.entries(InternalConfig)
  .reverse()
  .map(([name, href]) => ({
    name,
    href,
  }));
