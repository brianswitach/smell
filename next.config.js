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
    unoptimized: process.env.NODE_ENV === 'production', // Para mejor compatibilidad con Netlify
  },
  output: 'standalone', // Mejor para despliegues en Netlify
};

module.exports = nextConfig; 