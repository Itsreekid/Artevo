'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function PinterestIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.03-2.83.19-.76 1.27-5.38 1.27-5.38s-.32-.65-.32-1.61c0-1.51.87-2.64 1.96-2.64.92 0 1.37.69 1.37 1.53 0 .93-.59 2.33-.9 3.62-.26 1.08.53 1.96 1.58 1.96 1.9 0 3.18-2.43 3.18-5.3 0-2.18-1.47-3.82-4.13-3.82-3.01 0-4.9 2.25-4.9 4.77 0 .87.26 1.48.67 1.96.18.22.21.31.14.56-.05.19-.17.63-.21.81-.07.27-.28.37-.51.27-1.45-.6-2.13-2.21-2.13-4.02 0-2.99 2.52-6.58 7.54-6.58 4.02 0 6.66 2.91 6.66 6.04 0 4.14-2.3 7.24-5.65 7.24-1.13 0-2.2-.61-2.57-1.3l-.74 2.86c-.27 1.01-.99 2.27-1.48 3.04.89.28 1.84.43 2.82.43 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
    </svg>
  );
}

const LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Track Order', href: '/track' },
  { label: 'Wishlist', href: '/wishlist' },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Brand column */}
        <div className={styles.brand}>
          <div className={styles.logoWrapper}>
            <Image
              src="/artevo-logo.png"
              alt="ARTEVO"
              width={110}
              height={40}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <p className={styles.tagline}>
            Make space for your vibe.
          </p>
          <p className={styles.subbrand}>
            Natural wood wall racks for real rooms.
          </p>

          <div className={styles.socials}>
            <a href="https://instagram.com/artevo" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialLink}>
              <InstagramIcon size={18} />
            </a>
            <a href="https://tiktok.com/@artevo" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className={styles.socialLink}>
              <TikTokIcon size={18} />
            </a>
            <a href="https://pinterest.com/artevo" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className={styles.socialLink}>
              <PinterestIcon size={18} />
            </a>
          </div>
        </div>

        {/* Links */}
        <nav className={styles.links} aria-label="Footer navigation">
          <p className={styles.linksTitle}>Pages</p>
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} className={styles.link}>{l.label}</Link>
          ))}
        </nav>

        {/* Tag */}
        <div className={styles.tagSection}>
          <p className={`${styles.tagBig} artevo-display`}>#ShowUsYourWall</p>
          <p className={styles.tagSub}>Tag us in your room setup.</p>
        </div>
      </div>

      <div className={styles.bottom} suppressHydrationWarning>
        <p suppressHydrationWarning>© {new Date().getFullYear()} ARTEVO. All rights reserved.</p>
        <div className={styles.bottomDoodle}>✦ Your wall. Your vibe. ✦</div>
      </div>
    </footer>
  );
}
