import type { NextConfig } from 'next';

const nextConfig: NextConfig & { experimental: { serverActions?: boolean } } = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ['m.media-amazon.com'],
    },
};

export default nextConfig;
