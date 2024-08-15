"use client";

import { type FormState, subscribeAction } from "@/actions/subscribe";
import { useFormState } from "react-dom";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type NewsletterFormProps = {
  tags: string[];
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function NewsletterForm({ tags }: NewsletterFormProps) {
  // ---------------------------------------------------------------------------
  // Form
  // ---------------------------------------------------------------------------

  const initialState = {
    errors: {},
    message: null,
    state: "idle" as FormState,
    tags: tags,
  };
  const [formState, dispatch] = useFormState(subscribeAction, initialState);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      <form action={dispatch} className="mt-6 sm:flex sm:max-w-lg">
        <div className="min-w-0 flex-1">
          <label htmlFor="cta-email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="block w-full rounded-md border border-transparent px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
            placeholder="Enter your email"
          />
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-3">
          <button
            type="submit"
            className="block w-full rounded-md border border-transparent bg-indigo-500 px-5 py-3 font-medium text-base text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10"
          >
            Notify me
          </button>
        </div>
      </form>
      {formState.state === "error" && (
        <p
          className="mt-2 px-5 text-red-300 text-sm dark:text-red-500"
          id="email-error"
          aria-live="polite"
        >
          {formState?.message}
        </p>
      )}
      {formState.state === "success" && (
        <p
          className="mt-2 px-5 text-green-300 text-sm dark:text-green-500"
          id="email-success"
          aria-live="polite"
        >
          {formState?.message}
        </p>
      )}
    </>
  );
}
