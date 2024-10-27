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

"use client";

import { getQueryClient } from "@/lib/query";
import { TooltipProvider } from "@lightdotso/ui/components/tooltip";
import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { useEffect, useState } from "react";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [queryClient, setQueryClient] = useState<QueryClient | undefined>();

  useEffect(() => {
    setQueryClient(getQueryClient());
  }, []);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (!queryClient) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <NextThemesProvider {...props}>
          <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
          <ReactQueryDevtools
            initialIsOpen={process.env.NODE_ENV === "development"}
          />
        </NextThemesProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
}
