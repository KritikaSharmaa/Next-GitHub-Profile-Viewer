/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // next/image refuses to load images from domains you haven't
    // explicitly allow-listed here — this is a security measure so
    // your app can't be tricked into optimizing/serving arbitrary
    // external images. GitHub avatars are served from this domain.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
