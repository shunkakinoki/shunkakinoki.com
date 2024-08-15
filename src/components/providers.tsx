"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <JotaiProvider>
      <NextThemesProvider {...props}>
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </NextThemesProvider>
    </JotaiProvider>
  );
}
