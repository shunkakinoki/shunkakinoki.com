import Link from "next/link";

export default function CreditsButton(): JSX.Element {
  return (
    <Link href="/credits">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="flex justify-center items-center p-2 rounded-full focus:ring-2 focus:ring-pink-600 dark:focus:ring-pink-400 focus:ring-offset-2 focus:outline-none">
        <svg
          className="w-6 h-6 text-pink-700 hover:text-pink-900 dark:text-pink-300 dark:hover:text-pink-100 fill-current"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </Link>
  );
}
