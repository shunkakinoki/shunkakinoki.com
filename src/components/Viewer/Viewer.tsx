import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";

import type { FC } from "react";

import { Button } from "@/common/Button";

import { useConfig } from "@/hooks/useConfig";
import { useCopy } from "@/hooks/useCopy";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useLayoutConfig } from "@/hooks/useLayoutConfig";

export const Viewer: FC = () => {
  const [config] = useConfig();
  const [isCopied, copy] = useCopy();
  const [layoutConfig] = useLayoutConfig();
  const [isLoaded, setIsLoaded] = useState(true);

  const query = useMemo(() => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries({ ...config, ...layoutConfig })) {
      if (value != null) {
        searchParams.set(key, value);
      }
    }

    return searchParams.toString();
  }, [config, layoutConfig]);

  const ogURL = "https://og.shunkakinoki.com";
  const imageURL = useMemo(() => {
    return `/api/image?${query}`;
  }, [query]);
  const htmlURL = useMemo(() => {
    return `/api/html?${query}`;
  }, [query]);

  const debouncedImageURL = useDebouncedValue(ogURL + imageURL, 200);

  useEffect(() => {
    return setIsLoaded(false);
  }, [debouncedImageURL]);

  return (
    <div className="col-span-2 space-y-4 w-full">
      <div className="relative w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height={1080}
          width={2048}
          className={clsx(!isLoaded && "blur-sm")}
          src={debouncedImageURL}
          alt={`OG for the ${config.layoutName} layout`}
          onLoad={(): void => {
            return setIsLoaded(true);
          }}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          onClick={(): void => {
            return copy(`${ogURL}${imageURL}`);
          }}
        >
          {isCopied ? "Copied!" : "Copy Image URL"}
        </Button>
        <Button
          href={`${ogURL}${htmlURL}`}
          Component="a"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open HTML Page
        </Button>
      </div>
    </div>
  );
};
