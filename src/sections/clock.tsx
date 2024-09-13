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
    <section class="w-full py-12 text-text md:py-16 lg:py-24">
      <div class="flex flex-col items-center justify-center">
        <h6 class="text-2xl md:text-3xl lg:text-4xl">
          {time.toLocaleString("en", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h6>
        <h3 class="mt-8 font-semibold text-5xl md:text-6xl lg:text-9xl">
          {time.toLocaleTimeString("en", { hour12: false })}
        </h3>
      </div>
    </section>
  );
};
