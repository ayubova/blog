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
      `${process.env.DO_SPACES_BUCKET}.nyc3.cdn.digitaloceanspaces.com`
    ],
  },
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
};

module.exports = withBundleAnalyzer(nextConfig)
