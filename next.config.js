/** @type {import('next').NextConfig} */
const nextConfig ={
  reactStrictMode:true,
  swcMinify:true,
  images:{
    formats:['image/avif', 'image/webp'],
    domains: ['wp.larestrip.com']
  }
}

module.exports = nextConfig