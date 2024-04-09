/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DOMAIN_ORIGIN:
      process.env.NODE_ENV === "production"
        ? `https://${process.env.NEXT_PUBLIC_SITE_URL}`
        : "http://localhost:3000",
  },
};

export default nextConfig;
