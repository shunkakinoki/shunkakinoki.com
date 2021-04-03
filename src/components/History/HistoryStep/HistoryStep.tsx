import clsx from "clsx";

import { Cake, Chip, Fire, Globe, School, Tag, Work } from "@/icons";

interface Props {
  isBottom?: boolean;
  children: string;
  time: string;
  type: "cake" | "chip" | "fire" | "globe" | "school" | "tag" | "work";
}

function HistoryConnector(): JSX.Element {
  return (
    <span
      className="absolute h-full -ml-px bg-gray-200 dark:bg-gray-500 top-4 left-4 w-0.5"
      aria-hidden="true"
    />
  );
}

export default function HistoryStep({
  isBottom = false,
  children,
  time,
  type,
}: Props): JSX.Element {
  return (
    <li>
      <div
        className={clsx("relative", isBottom && "pb-2", !isBottom && "pb-8")}
      >
        {!isBottom && <HistoryConnector />}
        <div className="relative flex space-x-3">
          <div>
            <span
              className={clsx(
                "flex items-center justify-center w-8 h-8 rounded-full ring-8 ring-white dark:ring-black dark:text-gray-100",
                type === "cake" && "bg-pink-500",
                type === "chip" && "bg-gray-500",
                type === "fire" && "bg-red-500",
                type === "globe" && "bg-green-500",
                type === "school" && "bg-yellow-500",
                type === "tag" && "bg-blue-500",
                type === "work" && "bg-indigo-500",
              )}
            >
              {type === "cake" && <Cake />}
              {type === "chip" && <Chip />}
              {type === "fire" && <Fire />}
              {type === "globe" && <Globe />}
              {type === "school" && <School />}
              {type === "tag" && <Tag />}
              {type === "work" && <Work />}
            </span>
          </div>
          <div className="flex items-center justify-between flex-1 min-w-0 space-x-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-3">
                {children}
              </p>
            </div>
            <div className="text-sm text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
              <time>{time}</time>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
