import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Caveat, Cairo } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { LanguageProvider } from '@/context/LanguageContext';
import MainWrapper from '@/components/layout/MainWrapper';
import FacebookPixel from '@/components/analytics/FacebookPixel';

// Plus Jakarta Sans — primary body / UI font
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  preload: true,
  display: 'swap',
});

// Caveat — handwritten brand display font
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-caveat',
  preload: true,
  display: 'swap',
});

// Cairo — Arabic language support
const cairo = Cairo({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  preload: false,
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ARTEVO — Make Space for Your Vibe',
    template: '%s | ARTEVO',
  },
  description:
    'ARTEVO wooden wall racks. Designed for real rooms. Your wall. Your vibe.',
  keywords: ['wall rack', 'wood rack', 'home decor', 'wall storage', 'ARTEVO', 'wooden shelf'],
  authors: [{ name: 'ARTEVO' }],
  openGraph: {
    title:       'ARTEVO — Make Space for Your Vibe',
    description: 'A little piece that makes your space feel more like you.',
    type:        'website',
    locale:      'en_US',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${caveat.variable} ${cairo.variable}`} suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <FacebookPixel />
      </head>
      <body>
        <LanguageProvider>
          <CartProvider>
            <WishlistProvider>
              <Navbar />
              <MainWrapper>
                {children}
              </MainWrapper>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
