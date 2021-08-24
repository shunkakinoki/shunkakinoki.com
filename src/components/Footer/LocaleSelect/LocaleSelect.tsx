import { ChevronDownIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import type { FC } from "react";

export const LocaleSelect: FC = () => {
  const router = useRouter();

  return (
    <form>
      <fieldset className="w-full">
        <label htmlFor="mode" className="sr-only">
          Mode
        </label>
        <div className="relative">
          {router.locale !== undefined && (
            <select
              id="mode"
              className="block py-2 pr-10 pl-3 w-full text-base sm:text-sm text-gray-900 dark:text-gray-300 bg-white dark:bg-black bg-none rounded-md border border-gray-300 focus:border-indigo-500 dark:border-gray-600 focus:ring-indigo-500 appearance-none focus:outline-none"
              value={router.locale}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onBlur={() => {}}
              onChange={e => {
                return router.push(router.pathname, router.asPath, {
                  locale: e.target.value,
                });
              }}
            >
              <option value="en">English</option>
              <option value="ja">日本語</option>
              <option value="zh">中文</option>
            </select>
          )}
          <div className="flex absolute inset-y-0 right-0 items-center pr-2 text-gray-600 dark:text-gray-300 pointer-events-none">
            <ChevronDownIcon className="pr-1 w-5 h-5" />
          </div>
        </div>
      </fieldset>
    </form>
  );
};
