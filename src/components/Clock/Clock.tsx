import type { FC } from "react";
import { useEffect, useState } from "react";

export const Clock: FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 100);
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-24 px-3 w-full text-black dark:text-white">
      <div className="flex flex-col justify-center items-center">
        <h6 className="text-2xl md:text-3xl lg:text-4xl">
          {time.toLocaleString("en", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h6>
        <h3 className="mt-8 text-5xl md:text-6xl lg:text-9xl font-semibold">
          {time.toLocaleTimeString("en", { hour12: false })}
        </h3>
      </div>
    </section>
  );
};
