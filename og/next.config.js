/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = {
  experimental: {
    externalDir: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.child_process = false;
    }
    return config;
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
