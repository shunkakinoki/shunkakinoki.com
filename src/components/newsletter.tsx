export function Newsletter() {
  return (
    <section>
      <div className="sm:max-w-3xl lg:max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl bg-indigo-600 px-6 py-8 shadow-xl sm:px-12 sm:py-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
          >
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
              viewBox="0 0 1463 360"
            >
              <path
                className="text-indigo-500 text-opacity-40"
                fill="currentColor"
                d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
              />
              <path
                className="text-indigo-700 text-opacity-40"
                fill="currentColor"
                d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
              />
            </svg>
          </div>
          <div className="relative">
            <div>
              <h2 className="text-lg font-extrabold tracking-tighter text-white sm:text-2xl">
                Subscribe to my newsletter.
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-indigo-200">
                Get the latest posts delivered right to your inbox.
              </p>
            </div>
            <form action="#" className="mt-6 sm:flex sm:max-w-lg">
              <div className="min-w-0 flex-1">
                <label htmlFor="cta-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="cta-email"
                  type="email"
                  className="block w-full rounded-md border border-transparent px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mt-4 sm:ml-3 sm:mt-0">
                <button
                  type="submit"
                  className="block w-full rounded-md border border-transparent bg-indigo-500 px-5 py-3 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10"
                >
                  Notify me
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
