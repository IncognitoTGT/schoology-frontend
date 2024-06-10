/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*.schoology.com",
				port: "",
				pathname: "/**",
			},
		],
	},
	experimental: {
		after: true,
	},
};

export default nextConfig;
