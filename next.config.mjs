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
  experimental: {
    ppr: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
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

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

// biome-ignore lint/style/noDefaultExport: <explanation>
export default withNextIntl(nextConfig);
