/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Required for static export
  basePath: '/<Sup02>', // Replace <repository-name> with your GitHub repo name
  images: {
    unoptimized: true, // Required for static deployment
  }, typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig;