const withNextIntl = require('next-intl/plugin')(
  // Specify a custom path here
  './i18n/i18n.ts'
);

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: { domains: ['img.spoonacular.com'] }
};

module.exports = withNextIntl(nextConfig);
