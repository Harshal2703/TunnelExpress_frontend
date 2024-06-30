/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        "GoogleAuthClientID": process.env.GoogleAuthClientID,
        "DB_URI": process.env.DB_URI
    }
};

export default nextConfig;
