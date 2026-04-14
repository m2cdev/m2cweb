/** @type {import('next').NextConfig} */
const nextConfig = {
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
  transpilePackages: ['@splinetool/runtime'],
  webpack: (config) => {
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;
