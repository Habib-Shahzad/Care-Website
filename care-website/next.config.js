/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['swiperjs.com', 'asherewecare.pk'],
    unoptimized: true,

  },
  output: 'export',
};

module.exports = nextConfig;
