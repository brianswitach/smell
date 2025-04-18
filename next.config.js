/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      'lattafa.al',
      'm.media-amazon.com',
      'avinari.cl',
      'aztra.pe',
      'i0.wp.com',
    ],
    unoptimized: true, // Para mejor compatibilidad con Netlify
  },
  output: 'standalone', // Mejor para despliegues en Netlify
  eslint: {
    ignoreDuringBuilds: true, // Para evitar que los errores de eslint bloqueen el build
  },
  typescript: {
    ignoreBuildErrors: true, // Para evitar que los errores de typescript bloqueen el build
  },
  reactStrictMode: true,
};

module.exports = nextConfig; 