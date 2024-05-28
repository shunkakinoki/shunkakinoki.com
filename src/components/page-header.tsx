import Balance from "react-wrap-balancer";

import { cn } from "@/lib/utils";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section className={cn("flex flex-col gap-2", className)} {...props}>
      {children}
    </section>
  );
}

export function PageHeaderHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]",
        className,
      )}
      {...props}
    />
  );
}

export function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <Balance
      className={cn(
        "text-base md:text-lg font-light text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function PageActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex w-full items-center space-x-4 py-4 md:pb-10",
        className,
      )}
      {...props}
    />
  );
}
