/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    externalDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://shunkakinoki.com/og",
        permanent: true,
      },
    ];
  },
  trailingSlash: false,
};
