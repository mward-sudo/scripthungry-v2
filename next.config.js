/** @type {import('next').NextConfig} */

const withPreact = require('next-plugin-preact')

module.exports = withPreact({
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 400, 640, 750, 828, 1080, 1200, 1400, 1920, 2048, 3840],
  },
})
