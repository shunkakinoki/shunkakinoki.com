/* Icons from heroicons.dev */

import { useTheme } from "next-themes";

export default function DarkModeButton(): JSX.Element {
  const { resolvedTheme, theme, setTheme } = useTheme();

  const toggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      aria-label="Dark Mode Button"
      type="button"
      className="w-10 h-10 p-3 bg-gray-300 rounded dark:bg-gray-700"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          className="w-4 h-4 text-gray-800 dark:text-gray-100"
        >
          {theme === "light" ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            ></path>
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          )}
        </svg>
      )}
    </button>
  );
}
