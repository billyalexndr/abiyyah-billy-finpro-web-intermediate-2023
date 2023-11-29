/** @type {import('next').NextConfig} */
const nextConfig = {
    target: "server",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.tmdb.org",
            },
        ],
    },
};

module.exports = nextConfig;
