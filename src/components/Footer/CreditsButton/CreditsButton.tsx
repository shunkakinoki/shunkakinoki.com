import clsx from "clsx";

import useCredits from "@/hooks/useCredits";

export default function CreditsButton(): JSX.Element {
  const [isOpen, setIsOpen] = useCredits();

  return (
    <button
      aria-label="Credits Button"
      type="button"
      className="flex items-center justify-center p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-600"
      onClick={() => setIsOpen(!isOpen)}
    >
      <svg
        className={clsx("w-6 h-6 text-pink-700", !isOpen && "fill-current")}
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
    </button>
  );
}
