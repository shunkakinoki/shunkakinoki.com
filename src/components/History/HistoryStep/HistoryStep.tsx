import {
  CakeIcon,
  ChipIcon,
  FireIcon,
  GlobeIcon,
  AcademicCapIcon,
  TagIcon,
  BriefcaseIcon,
} from "@heroicons/react/outline";
import clsx from "clsx";
import type { FC } from "react";

export interface Props {
  isBottom?: boolean;
  children: string;
  time: string;
  type: "cake" | "chip" | "fire" | "globe" | "school" | "tag" | "work";
}

const HistoryConnector: FC = () => {
  return (
    <span
      className="absolute top-4 left-4 -ml-px w-0.5 h-full bg-gray-200 dark:bg-gray-500"
      aria-hidden="true"
    />
  );
};

export const HistoryStep: FC<Props> = ({
  isBottom = false,
  children,
  time,
  type,
}) => {
  return (
    <li>
      <div
        className={clsx("relative", isBottom && "pb-2", !isBottom && "pb-8")}
      >
        {!isBottom && <HistoryConnector />}
        <div className="flex relative space-x-3">
          <div>
            <span
              className={clsx(
                "flex justify-center items-center w-8 h-8 dark:text-gray-100 rounded-full ring-8 ring-white dark:ring-black",
                type === "cake" && "bg-pink-500",
                type === "chip" && "bg-gray-500",
                type === "fire" && "bg-red-500",
                type === "globe" && "bg-green-500",
                type === "school" && "bg-yellow-500",
                type === "tag" && "bg-blue-500",
                type === "work" && "bg-indigo-500",
              )}
            >
              {type === "cake" && <CakeIcon className="w-6 h-6" />}
              {type === "chip" && <ChipIcon className="w-6 h-6" />}
              {type === "fire" && <FireIcon className="w-6 h-6" />}
              {type === "globe" && <GlobeIcon className="w-6 h-6" />}
              {type === "school" && <AcademicCapIcon className="w-6 h-6" />}
              {type === "tag" && <TagIcon className="w-6 h-6" />}
              {type === "work" && <BriefcaseIcon className="w-6 h-6" />}
            </span>
          </div>
          <div className="flex flex-1 justify-between items-center space-x-4 min-w-0">
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
};
