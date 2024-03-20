/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com','avatars.dicebear.com'],
  },
  output: 'standalone',
  async rewrites() {
    return {
      afterFiles: [
        {
          source: '/migrator/:path*',
          destination: 'https://snowmigrate.azurewebsites.net/:path*',
        },
      ],
      fallback: [
        {
          source: '/:path*',
          destination: 'https://snowmigrate.azurewebsites.net/:path*',
        },
      ],
    }
  },
}
