import clsx from "clsx";
import { useState } from "react";
import useSWR from "swr";

import { Badge, Exclamation, Light } from "@/icons";
import fetcher from "@/lib/fetcher";

export default function Newsletter(): JSX.Element {
  const { data } = useSWR<{
    subscribers: number;
  }>("/api/buttondown", fetcher);

  const [form, setForm] = useState<{
    message: string;
    state: "error" | "success" | "loading" | "initial";
  }>({ message: "", state: "initial" });

  const subscribe = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setForm({ message: "", state: "loading" });

    const formData = new FormData(e.target as HTMLFormElement);

    const res = await fetch("/api/subscribe", {
      body: JSON.stringify({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        email: formData.get("email"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { error } = await res.json();
    if (error) {
      setForm({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        message: error,
        state: "error",
      });
      return;
    }

    setForm({
      message: "Thank you for subscribing to the newsletter!",
      state: "success",
    });
  };

  return (
    <div className="w-full px-3 my-6">
      <div className="relative">
        <div className="relative px-6 py-10 overflow-hidden bg-indigo-600 border border-gray-700 shadow-xl dark:border-gray-400 dark:bg-indigo-800 rounded-2xl sm:px-12">
          <div
            aria-hidden="true"
            className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
          >
            <svg
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 1463 360"
            >
              <path
                className="text-indigo-500 text-opacity-40 dark:text-indigo-700"
                fill="currentColor"
                d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
              />
              <path
                className="text-indigo-700 text-opacity-40 dark:text-indigo-900"
                fill="currentColor"
                d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
              />
            </svg>
          </div>
          <div className="relative">
            <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl md:text-3xl">
              Subscribe to my newsletter.
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-sm text-indigo-50">
              Every Sunday I write an email newsletter with some thoughts, life
              lessons and insights regading my journey. I would love for you to
              join.
            </p>
            <form
              className="mt-6 sm:mx-auto sm:max-w-lg sm:flex"
              onSubmit={subscribe}
            >
              <div className="relative flex-1 min-w-0">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 border border-transparent rounded-md shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                  placeholder="Enter your email"
                />
                {form?.state === "error" && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500 pointer-events-none">
                    <Exclamation />
                  </div>
                )}
                {form?.state === "success" && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-green-500 pointer-events-none">
                    <Badge />
                  </div>
                )}
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-3">
                <button
                  type="submit"
                  className={clsx(
                    "inline-flex items-center w-full px-5 py-3 text-base font-medium text-white bg-indigo-500 border border-transparent rounded-md shadow dark:bg-indigo-600 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10 dark:hover:bg-indigo-500",
                    "cursor-not-allowed" && form?.state === "loading",
                  )}
                >
                  {form?.state === "loading" && (
                    <svg
                      className="w-5 h-5 mr-3 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  )}
                  {form?.state === "loading" && "Loading..."}
                  {form?.state !== "loading" && "Subscribe"}
                </button>
              </div>
            </form>
            {form?.state === "error" && (
              <p
                className="px-5 mt-2 text-sm text-red-300 dark:text-red-500"
                id="email-error"
              >
                {form?.message}
              </p>
            )}
            {form?.state === "success" && (
              <p
                className="px-5 mt-2 text-sm text-green-300 dark:text-green-500"
                id="email-success"
              >
                {form?.message}
              </p>
            )}
            <p className="flex max-w-2xl mx-auto mt-4 text-xs font-medium align-text-bottom text-indigo-50">
              <Light />
              {data?.subscribers} Subscribers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
