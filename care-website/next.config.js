/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['localhost', 'swiperjs.com', 'asherewecare.pk'],
    unoptimized: true,
  },
}

module.exports = nextConfig
