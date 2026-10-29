import { Gloock, Figtree, DM_Mono, Caveat } from 'next/font/google';
import './lipsy.css';

// next/font downloads these at build time and serves them from your own
// domain, so there is no flash of unstyled text and no request to Google.
const gloock = Gloock({ subsets: ['latin'], weight: '400', variable: '--f-gloock', display: 'swap' });
const figtree = Figtree({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--f-figtree', display: 'swap' });
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--f-mono', display: 'swap' });
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '600'], variable: '--f-hand', display: 'swap' });

// Metadata API: sets the tab title and the WhatsApp / Instagram link preview.
// The preview picture comes from opengraph-image.js in this same folder.
export const metadata = {
  title: "Lipsy's Birthday Sky",
  description: 'A small sky, built for you.',
  // Personal page: keep it out of Google.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Lipsy's Birthday Sky",
    description: 'A small sky, built for you.',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0a0920',
  colorScheme: 'dark',
};

export default function LipsyLayout({ children }) {
  const fonts = [gloock.variable, figtree.variable, dmMono.variable, caveat.variable].join(' ');
  return <div className={`lipsy ${fonts}`}>{children}</div>;
}
