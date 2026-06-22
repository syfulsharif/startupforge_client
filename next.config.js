/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL || "http://localhost:5000/api",
    NEXT_PUBLIC_IMGBB_API_KEY: process.env.NEXT_PUBLIC_IMGBB_API_KEY || process.env.VITE_IMGBB_API_KEY || "40fc352c6909e2cee7457e65b91131f8",
    VITE_API_URL: process.env.VITE_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
    VITE_IMGBB_API_KEY: process.env.VITE_IMGBB_API_KEY || process.env.NEXT_PUBLIC_IMGBB_API_KEY || "40fc352c6909e2cee7457e65b91131f8",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
