import type { Metadata } from 'next';
import './homepage.css';
import './interior.css';
import { SiteHeader, SiteFooter } from './components/site-shell';
export const metadata: Metadata = { title: 'PHAGECON | Pharmaceutical Consulting', description: 'Expert pharmaceutical consulting, regulatory affairs, pharmacovigilance and quality services.', robots: { index: false, follow: false } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><SiteHeader/>{children}<SiteFooter/></body></html>; }
