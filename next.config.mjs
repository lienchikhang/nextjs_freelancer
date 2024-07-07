/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["res.cloudinary.com", "https://www.facebook.com"],
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'www.facebook.com',
      },
    ],
  },
  reactStrictMode: false
};

export default nextConfig;
