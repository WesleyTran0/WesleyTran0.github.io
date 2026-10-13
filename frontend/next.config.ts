import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	distDir: "build",
	images: {
		unoptimized: true
	},
	trailingSlash: true,
	devIndicators: false
};

export default nextConfig;
