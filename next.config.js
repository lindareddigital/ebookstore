/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  future: {
    webpack5: true,
  },
}

module.exports = nextConfig
