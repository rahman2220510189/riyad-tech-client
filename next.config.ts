import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  /* Long-lived caching for the optimised images, and a short list of headers
     that cost nothing and close the obvious holes. */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },

  images: {
    /* Cloudinary already serves a cache-friendly URL per transformation, so
       the optimiser can hold on to its output for a year. */
    minimumCacheTTL: 31_536_000,
    /* next/image will only fetch and optimise from hosts named here. It is a
       deliberate restriction: without it, anything that can write an image URL
       into the database could point this site's optimiser at any server on the
       internet and have us pay for the bandwidth.

       Cloudinary is where the admin panel uploads, so it is the only one. */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;