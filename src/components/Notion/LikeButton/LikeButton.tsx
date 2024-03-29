import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/outline";
import type { FC } from "react";

import { useLikes } from "@/hooks/useLikes";

export interface Props {
  pageId: string;
}

export const LikeButton: FC<Props> = ({ pageId }) => {
  const { isLoading, likes, mutate } = useLikes(pageId);

  return (
    <div className="flex items-center space-x-2">
      <button
        className="py-2 px-5 font-semibold text-pink-400 hover:text-pink-100 dark:text-pink-500 dark:hover:text-pink-200 hover:bg-pink-400 dark:hover:bg-pink-600 rounded-lg border-2 border-pink-300 dark:border-pink-400 transition duration-300 ease-in-out hover:scale-110 hover:-translate-y-1"
        onClick={async () => {
          await mutate({ likes: likes + 1 }, false);
          await fetch(`/api/likes/${pageId}`, {
            method: "POST",
          });
          await mutate();
        }}
      >
        <div className="flex items-center">
          <OutlineHeartIcon className="w-5 h-5" />
          &nbsp;
          {isLoading && (
            <div className="flex">
              <div className="mx-0.5 w-1 h-1 bg-pink-300 rounded-full animate-bounce" />
              <div className="mx-0.5 w-1 h-1 bg-pink-400 rounded-full animate-bounce" />
              <div className="mx-0.5 w-1 h-1 bg-pink-600 rounded-full animate-bounce" />
            </div>
          )}
          {!isLoading && likes.toLocaleString()}
        </div>
      </button>
    </div>
  );
};
