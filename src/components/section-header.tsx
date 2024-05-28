import { cn } from "@/lib/utils";

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
        "text-xl font-bold leading-tight tracking-tighter md:text-2xl lg:leading-[1.1] mb-4",
        className,
      )}
      {...props}
    />
  );
}
