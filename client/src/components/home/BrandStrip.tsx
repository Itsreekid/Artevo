'use client';

import styles from './BrandStrip.module.css';

const DETAILS = [
  {
    id: 'wood',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect x="4" y="14" width="28" height="5" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 14V10C8 8.9 8.9 8 10 8H26C27.1 8 28 8.9 28 10V14" stroke="currentColor" strokeWidth="1.8"/>
        <line x1="12" y1="8" x2="12" y2="14" stroke="currentColor" strokeWidth="1.8"/>
        <line x1="18" y1="8" x2="18" y2="14" stroke="currentColor" strokeWidth="1.8"/>
        <line x1="24" y1="8" x2="24" y2="14" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M10 19V28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M26 19V28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Natural wood',
    desc: 'Solid beech & oak sourced for warmth, durability and character.',
  },
  {
    id: 'mount',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect x="6" y="10" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M18 8.5V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="10" y1="18" x2="26" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M12 22L12 26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M24 22L24 26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Wall mounted',
    desc: 'Mounts flat against any wall. Clean, secure, done in minutes.',
  },
  {
    id: 'hooks',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M8 18 H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 18 Q12 26 18 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M20 18 Q20 26 26 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="24" cy="14" r="3" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
    title: 'Everyday storage',
    desc: 'Bags, keys, jackets, scarves. Everything in its good spot.',
  },
  {
    id: 'design',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M6 28L18 8L30 28H6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
        <path d="M10 22L18 10L26 22" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" opacity="0.4"/>
        <circle cx="18" cy="22" r="3" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
    title: 'Designed to last',
    desc: 'Simple geometry. No trends, no clutter. Timeless by design.',
  },
];

export default function BrandStrip() {
  return (
    <section className={styles.section} id="brand" aria-label="Product Details">
      <div className={styles.inner}>
        {/* Section header */}
        <div className={styles.header}>
          <p className={`${styles.eyebrow} artevo-display`}>Small details.</p>
          <h2 className={styles.headline}>
            Big difference.
            <span className={styles.yellowUnderline} aria-hidden="true" />
          </h2>
          <p className={styles.sub}>
            We sweat the small stuff so you don&apos;t have to.
          </p>
        </div>

        {/* Feature cards */}
        <div className={styles.grid}>
          {DETAILS.map(d => (
            <div key={d.id} className={styles.card}>
              <div className={styles.icon}>{d.icon}</div>
              <h3 className={styles.cardTitle}>{d.title}</h3>
              <p className={styles.cardDesc}>{d.desc}</p>
            </div>
          ))}
        </div>

        {/* Show us your wall CTA */}
        <div className={styles.socialSection}>
          <div className={styles.socialContent}>
            <p className={`${styles.socialEyebrow} artevo-display`}>Show us your wall →</p>
            <p className={styles.socialDesc}>
              Tag us in your setup and get featured.
            </p>
            <a
              href="https://instagram.com/artevo"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialHandle}
              aria-label="ARTEVO on Instagram"
            >
              @artevo
            </a>
          </div>
          <div className={styles.socialGrid} aria-hidden="true">
            <div className={styles.socialPlaceholder}>📸</div>
            <div className={styles.socialPlaceholder}>🛖</div>
            <div className={styles.socialPlaceholder}>🪵</div>
            <div className={styles.socialPlaceholder}>🏡</div>
          </div>
        </div>
      </div>
    </section>
  );
}
