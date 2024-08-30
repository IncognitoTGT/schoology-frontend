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
		reactCompiler: true,
		after: true,
		serverActions: {
			bodySizeLimit: "10mb",
		},
	},
};

export default nextConfig;
