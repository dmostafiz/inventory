/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    DOMAIN: 'http://localhost:3000',
    SERVER_HOST: process.env.SERVER_HOST,
    BASE_API: process.env.BASE_API,
    GOOGLE_CLIENT_ID: '721639709461-pjuq114vpiae24gs165e1aedpp2shau3.apps.googleusercontent.com',
    FACEBOOK_APP_ID: '561683539070348'
  },
}

module.exports = nextConfig
