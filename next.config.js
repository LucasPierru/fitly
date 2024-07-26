const withNextIntl = require('next-intl/plugin')(
  // Specify a custom path here
  './i18n/i18n.ts'
);

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.spoonacular.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
};

module.exports = withNextIntl(nextConfig);
