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
};

export default nextConfig;
