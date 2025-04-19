/** @type {import('next').NextConfig} */
const path = require('path');
const WebpackPatchPlugin = require('./src/lib/webpack-patch-plugin');

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
  
  // Add transpilation config for Radix UI packages
  transpilePackages: [
    '@radix-ui/react-use-effect-event',
    '@radix-ui/react-dialog',
    '@radix-ui/react-dropdown-menu',
    '@radix-ui/react-context',
    '@radix-ui/react-use-controllable-state',
  ],
  
  // Configure webpack to handle externals
  webpack: (config, { isServer }) => {
    // Add our custom plugin to patch imports
    config.plugins.push(new WebpackPatchPlugin());
    
    // Add externals for problematic modules
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Replace @radix-ui/react-use-effect-event with our shim
        '@radix-ui/react-use-effect-event': path.resolve(__dirname, './src/lib/radix-ui-shims.tsx'),
      };
    }
    
    // Add externals configuration
    if (!config.externals) {
      config.externals = [];
    }
    
    // Add specific externals for React components that cause issues
    if (isServer) {
      config.externals.push(({ request }, callback) => {
        // If the request is for the problematic module, mark it as external
        if (request.includes('@radix-ui/react-use-effect-event')) {
          return callback(null, `commonjs ${request}`);
        }
        callback();
      });
    }
    
    return config;
  },
};

module.exports = nextConfig; 