/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  future: {
    webpack5: true,
  },
}

module.exports = nextConfig
