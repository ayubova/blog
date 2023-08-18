/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})


const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    SITE_URL: process.env.SITE_URL,
  },
  swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com",
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig)
