import { useRouter } from "next/router";

import { Down } from "@/icons";

export default function LocaleSelect(): JSX.Element {
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
              className="block w-full py-2 pl-3 pr-10 text-base text-gray-900 bg-white border border-gray-300 appearance-none rounded-md bg-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-black dark:text-gray-300 dark:border-gray-600"
              value={router.locale}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onBlur={() => {}}
              onChange={e =>
                router.push(router.pathname, router.asPath, {
                  locale: e.target.value,
                })
              }
            >
              <option value="en">English</option>
              <option value="ja">日本語</option>
              <option value="zh">中文</option>
            </select>
          )}
          <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 pointer-events-none dark:text-gray-300">
            <Down />
          </div>
        </div>
      </fieldset>
    </form>
  );
}
