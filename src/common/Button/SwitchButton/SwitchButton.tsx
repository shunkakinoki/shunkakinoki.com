import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import type { LinkProps } from "next/link";
import Link from "next/link";

import type { FC } from "react";

interface Props extends LinkProps {
  href: string;
  type: "right" | "left";
}

export const SwitchButton: FC<Props> = ({ href, type }) => {
  return (
    <Link href={href}>
      <a
        className="text-indigo-500 dark:text-indigo-300 hover:underline align-bottom cursor-pointer"
        aria-label={href}
      >
        <span className="inline-block text-lg align-bottom animate-pulse">
          {type === "right" && <ArrowRightIcon className="w-6 h-6" />}
          {type === "left" && <ArrowLeftIcon className="w-6 h-6" />}
        </span>
      </a>
    </Link>
  );
};
