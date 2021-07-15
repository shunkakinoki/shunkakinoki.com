import type { LinkProps } from "next/link";
import Link from "next/link";

import { Left, Right, Switch } from "@/icons";

interface Props extends LinkProps {
  href: string;
  type: "right" | "left" | "switch";
}

export default function SwitchButton({ href, type }: Props): JSX.Element {
  return (
    <Link href={href}>
      <a
        className="text-indigo-500 dark:text-indigo-300 hover:underline align-bottom cursor-pointer"
        aria-label={href}
      >
        <span className="inline-block text-lg align-bottom animate-pulse">
          {type === "right" && <Right />}
          {type === "left" && <Left />}
          {type === "switch" && <Switch />}
        </span>
      </a>
    </Link>
  );
}
