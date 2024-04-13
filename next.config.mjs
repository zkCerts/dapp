/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["crypto-js"],
    webpack: (config) => {
        // See: https://github.com/WalletConnect/walletconnect-monorepo/issues/1908
        config.externals.push("pino-pretty");
        config.resolve.fallback = {fs: false, net: false, tls: false};
        return config;
    },
};
export default nextConfig;
