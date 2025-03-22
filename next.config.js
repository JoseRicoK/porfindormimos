/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'images.pexels.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '**',
      },
    ],
  },
  // Configuración para ignorar errores TypeScript en construcción
  typescript: {
    // ⚠️ Sólo para producción, permitir build con errores de tipos
    ignoreBuildErrors: true,
  },
  // Configuración para ignorar errores ESLint en construcción
  eslint: {
    // ⚠️ Sólo para producción, permitir build con advertencias de ESLint
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
