/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    emotion: true,
  },
  transpilePackages: ['three'],
};

module.exports = nextConfig;
