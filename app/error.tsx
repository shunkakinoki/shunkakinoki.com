"use client"; // Error components must be Client Components

import { useEffect } from "react";

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
// biome-ignore lint/style/noDefaultExport: <explanation>
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {}, [error]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div>
      <h2>Something went wrong!</h2>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
