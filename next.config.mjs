/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.qrserver.com'],
  },
  // Treat CJS-only packages as external Node.js modules so they are not
  // bundled through the RSC webpack pipeline (prevents prototype errors).
  serverExternalPackages: ['bcryptjs', 'mongoose', 'twilio'],
};

export default nextConfig;



