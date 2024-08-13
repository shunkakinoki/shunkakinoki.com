"use client";

import { useEffect, useState } from "react";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const Clock = () => {
  // ---------------------------------------------------------------------------
  // Hooks
  // ---------------------------------------------------------------------------

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 100);
  }, []);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <section className="w-full py-12 text-black md:py-16 lg:py-24 dark:text-white">
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
