import type { NextConfig } from 'next';
const config: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  ...(process.env.PHAGECON_EXPORT === '1' ? { output: 'export' as const, distDir: '.next-export' } : {}),
  turbopack: { root: process.cwd() },
  outputFileTracingRoot: process.cwd(),
};
export default config;
