import type { NextConfig } from "next";
// import autoCert from "anchor-pki/auto-cert/integrations/next";

// const withAutoCert = autoCert({
//   enabledEnv: "development",
// });


const nextConfig: NextConfig = {
  /* config options here */ 
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

// export default withAutoCert(nextConfig);

export default nextConfig