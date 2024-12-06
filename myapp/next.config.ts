/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static export
  basePath: '/Sup02', // Replace with your GitHub repository name
  images: {
    unoptimized: true, // Required if you're using the Image component
  },
};

module.exports = nextConfig;