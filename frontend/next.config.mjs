/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_SERVER_ENDPOINT: process.env.NEXT_PUBLIC_SERVER_ENDPOINT,
    NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL:
      process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL,
  },
};

module.exports = nextConfig;
