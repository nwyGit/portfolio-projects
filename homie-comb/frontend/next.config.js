/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_OAUTH_URL: process.env.GOOGLE_OAUTH_URL,
    GOOGLE_OAUTH_REDIRECT_URI: process.env.GOOGLE_OAUTH_REDIRECT_URI,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GITHUB_OAUTH_URL: process.env.GITHUB_OAUTH_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  },
  images: {
    domains: ["d1f5djmdoem7hf.cloudfront.net"],
  },
};

module.exports = nextConfig;
