// Copyright 2023-2024 Shun Kakinoki.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { cn } from "@/lib/utils";
import type * as React from "react";
import Balance from "react-wrap-balancer";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

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
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <h1
      className={cn(
        "font-bold text-3xl leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]",
        className,
      )}
      {...props}
    />
  );
}

export function PageHeaderSubheading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <h2
      className={cn(
        "font-semibold text-text text-xl md:text-2xl lg:text-3xl",
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
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <Balance
      className={cn("font-light text-base text-text md:text-lg", className)}
      {...props}
    />
  );
}

export function PageActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

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
