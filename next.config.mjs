import { isLegalPublished } from "./src/content/legal/config.mjs";

const nextConfig = {
  serverExternalPackages: ['@splinetool/runtime'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'logo.clearbit.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.prod.website-files.com' },
      { protocol: 'https', hostname: 'wavesmvmnt.com' },
      { protocol: 'https', hostname: 'images.ctfassets.net' },
      { protocol: 'https', hostname: 'tech2clean.com' },
      { protocol: 'https', hostname: 'www.nosaiinnovations.com' },
      { protocol: 'https', hostname: 'solarisrobots.com' },
      { protocol: 'https', hostname: 'wbfc.ca' },
      { protocol: 'https', hostname: 'adam-tools.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
  },

  async redirects() {
    return [
      // The legal docs cite map2close.com/subprocessors.
      { source: "/subprocessors", destination: "/legal/subprocessors", permanent: false },
      // The existing /privacy page stays until the new Privacy Policy is published.
      ...(isLegalPublished("privacy") ? [{ source: "/privacy", destination: "/legal/privacy", permanent: false }] : []),
    ];
  },

  webpack: (config, { isServer }) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true
    };

    // Fix for WASM resolution: treat .wasm files as asset resources
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
    });

    // Alias process.wasm to false to prevent webpack from trying to bundle it
    config.resolve.alias = {
      ...config.resolve.alias,
      'process.wasm': false,
    };

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    return config;
  },
};

export default nextConfig;
