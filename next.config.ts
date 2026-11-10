import type { NextConfig } from 'next';
const config: NextConfig = {
  ...(process.env.PHAGECON_EXPORT === '1' ? { output: 'export' as const, distDir: '.next-export' } : {}),
  turbopack: { root: process.cwd() },
  outputFileTracingRoot: process.cwd(),
};
export default config;
