import { cn } from "@/lib/utils";
import type * as React from "react";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function SectionHeaderHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <h3
      className={cn(
        "mb-4 font-bold text-xl leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]",
        className,
      )}
      {...props}
    />
  );
}
