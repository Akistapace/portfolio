/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
		output: isProd ? "export" : 'standalone',  // <=== enables static exports
    reactStrictMode: true,
    swcMinify: true,
		assetPrefix: isProd ? '/portfolio/' : '',
		basePath: isProd ? '/portfolio' : '',
		eslint: {
			ignoreDuringBuilds: true,
		},
		typescript: {
			ignoreBuildErrors: true,
		},
    images: {
        domains: ['localhost'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'via.placeholder.com'
            },
            {
                protocol: 'http',
                hostname: 'localhost:8000',
              },
        ],
    }
};

export default nextConfig;
