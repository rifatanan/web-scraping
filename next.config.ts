import type { NextConfig } from 'next';

const nextConfig: NextConfig & { experimental: { serverActions?: boolean } } = {
    experimental: {
        serverActions: true,
    },
};

export default nextConfig;
