/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // এটি যেকোনো ডোমেইন থেকে ইমেজ লোড করার অনুমতি দিবে
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
