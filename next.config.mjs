/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "asset-cdn.schoology.com",
				port: "",
				pathname: "/**",
			},
		],
	},
    experimental: {
        after:true,
    }
}

export default nextConfig;
