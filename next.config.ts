import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "https://www.citypng.com/",
                pathname: "/**",
            },
        ],
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    rules: {
        "@typescript-eslint/no-explicit-any": "off", // or 'warn'
    },
};

export default nextConfig;
