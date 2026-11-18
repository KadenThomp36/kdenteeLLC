/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{ source: "/portfolio", destination: "/work", permanent: true }];
  },
};

module.exports = nextConfig;
