import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "/api/:path*",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/auth/login",
        destination: "/admin/login",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/admin/login",
        permanent: true,
      },
      {
        source: "/auth/register",
        destination: "/admin/login",
        permanent: true,
      },
      {
        source: "/register",
        destination: "/admin/login",
        permanent: true,
      },
      {
        source: "/forgot-password",
        destination: "/admin/login",
        permanent: true,
      },
      {
        source: "/auth",
        destination: "/admin/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;