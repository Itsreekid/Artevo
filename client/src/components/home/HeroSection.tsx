'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from './HeroSection.module.css';

function CrownDoodle() {
  return (
    <svg width="48" height="36" viewBox="0 0 36 28" fill="none" aria-hidden="true" className={styles.doodleCrown}>
      <path d="M4 22 L8 8 L18 16 L28 4 L32 18 L4 22Z" stroke="#FFE76B" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
      <path d="M4 22 L32 22" stroke="#FFE76B" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

function SparkleDoodle() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" className={styles.doodleSparkle}>
      <path d="M20 4 V16 M20 24 V36 M4 20 H16 M24 20 H36" stroke="#FFE76B" strokeWidth="3" strokeLinecap="round"/>
      <path d="M9 9 L15 15 M25 25 L31 31 M9 31 L15 25 M25 15 L31 9" stroke="#FFE76B" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-label="ARTEVO Hero">
      {/* Full bleed background image */}
      <div className={styles.bgImageWrap}>
        <Image
          src="/hero-artevo.png"
          alt="ARTEVO Wall Rack in a real room"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className={styles.heroImg}
        />
        {/* Subtle overlay for text readability if needed */}
        <div className={styles.bgOverlay} aria-hidden="true" />
      </div>

      <div className={styles.inner}>
        {/* Empty left side for desktop */}
        <div className={styles.spacer}></div>

        {/* Right side content */}
        <div className={styles.contentBox}>
          {/* Blur backdrop for text */}
          <div className={styles.contentBlur} aria-hidden="true" />

          <div className={styles.contentInner}>
            {/* The First Drop Badge */}
            <div className={styles.firstDropBadge} aria-hidden="true">
              <span className={`artevo-display ${styles.firstDropText}`}>THE<br/>FIRST<br/>DROP</span>
            </div>

            <div className={styles.crownWrap}>
              <CrownDoodle />
            </div>

            <div className={styles.headlineWrapper}>
              <div className={styles.sparkleWrap}><SparkleDoodle /></div>
              <h1 className={`${styles.headline} artevo-display`}>
                <span className={styles.headlineLine}>YOUR WALL.</span><br/>
                <span className={styles.headlineLine}>YOUR VIBE.</span>
              </h1>
            </div>

            <p className={styles.sub}>
              A place for the pieces you wear, love & live in.
            </p>

            <Link href="/shop" className={`${styles.primaryCta}`} id="hero-shop-cta">
              <span>SHOP THE DROP</span>
              <ArrowRight size={18} className={styles.ctaArrow} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
