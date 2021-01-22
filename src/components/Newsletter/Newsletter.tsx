export default function Newsletter(): JSX.Element {
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
            <form action="#" className="mt-6 sm:mx-auto sm:max-w-lg sm:flex">
              <div className="flex-1 min-w-0">
                <label htmlFor="cta_email" className="sr-only">
                  Email address
                </label>
                <input
                  id="cta_email"
                  type="email"
                  className="block w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 border border-transparent rounded-md shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-3">
                <button
                  type="submit"
                  className="block w-full px-5 py-3 text-base font-medium text-white bg-indigo-500 border border-transparent rounded-md shadow dark:bg-indigo-600 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10 dark:hover:bg-indigo-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
