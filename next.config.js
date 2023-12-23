/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["lh3.googleusercontent.com",  "firebasestorage.googleapis.com"]
    },
    env: {

        STRIPE_API_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
    },
}

module.exports = nextConfig
