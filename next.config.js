const createNextIntlPlugin = require('next-intl/plugin');

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
      },
      {
        protocol: 'https',
        hostname: 'rmxkhwvwxsfpjgejytou.supabase.co',
        port: '',
        pathname: '/storage/**'
      }
    ]
  }
};

const withNextIntl = createNextIntlPlugin();
module.exports = withNextIntl(nextConfig);
