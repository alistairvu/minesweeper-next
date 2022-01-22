const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
  },
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/:path(.{1,})',
        destination: '/',
        permanent: true,
        basePath: false,
      },
    ];
  },
});

module.exports = nextConfig;
