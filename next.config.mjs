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

import withBundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";

// -----------------------------------------------------------------------------
// Plugins
// -----------------------------------------------------------------------------

const withNextIntl = createNextIntlPlugin();

// -----------------------------------------------------------------------------
// Config
// -----------------------------------------------------------------------------

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  ppr: "incremental",
  images: {
    remotePatterns: [
      {
        hostname: "assets.light.so",
        protocol: "https",
        pathname: "**",
      },
    ],
  },
  // biome-ignore lint/suspicious/useAwait: <explanation>
  redirects: async () => {
    return [
      {
        source: "/cal",
        destination: "https://cal.com/shunkakinoki",
        permanent: true,
      },
    ];
  },
};

const plugins = [
  withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  }),
  withNextIntl,
];
// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

// biome-ignore lint/style/noDefaultExport: <explanation>
export default plugins.reduce((acc, next) => {
  return next(acc);
}, nextConfig);
