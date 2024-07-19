const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "firebasestorage.googleapis.com",
				port: "",
				pathname: "/v0/b/meichu-10y-web.appspot.com/o/**",
			},
		]
	}
};

export default nextConfig;