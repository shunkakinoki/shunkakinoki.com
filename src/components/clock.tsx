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

"use client";

import { useEffect, useState } from "react";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const Clock = () => {
  // ---------------------------------------------------------------------------
  // State Hooks
  // ---------------------------------------------------------------------------

  const [time, setTime] = useState(new Date());

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 100);
  }, []);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <section className="w-full py-12 text-text md:py-16 lg:py-24">
      <div className="flex flex-col items-center justify-center">
        <h6 className="text-2xl md:text-3xl lg:text-4xl">
          {time.toLocaleString("en", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h6>
        <h3 className="mt-8 font-semibold text-5xl md:text-6xl lg:text-9xl">
          {time.toLocaleTimeString("en", { hour12: false })}
        </h3>
      </div>
    </section>
  );
};
