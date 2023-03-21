/** @type {import('next').NextConfig} */
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

module.exports = nextConfig;
