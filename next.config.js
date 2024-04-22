/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  future: {
    webpack5: true,
  },
  async rewrites() {
    return [
      {
        source: "/terms",
        destination: "/",
      },
    ];
  },
};

module.exports = nextConfig
