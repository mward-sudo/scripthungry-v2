/** @type {import('next').NextConfig} */

const { StatsWriterPlugin } = require('webpack-stats-plugin')
const withPreact = require('next-plugin-preact')

module.exports = withPreact({
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 400, 640, 750, 828, 1080, 1200, 1400, 1920, 2048, 3840],
    domains: ['media.graphcms.com'],
  },
  webpack: (config, {}) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    }),
      config.plugins.push(
        new StatsWriterPlugin({
          filename: 'stats.json',
          stats: {
            context: './src', // optional, will improve readability of the paths
            assets: true,
            entrypoints: true,
            chunks: true,
            modules: true,
          },
        })
      )

    return config
  },
})
