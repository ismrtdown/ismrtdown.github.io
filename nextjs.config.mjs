/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',      // Outputs a 'out' folder
  images: {
    unoptimized: true,   // GitHub Pages doesn't support Next.js Image Optimization
  },
  // IMPORTANT: Replace 'my-static-site' with your exact GitHub Repository name
  // basePath: process.env.NODE_ENV === 'production' ? '/my-static-site' : '',
};

export default nextConfig;
