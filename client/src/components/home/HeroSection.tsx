'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from './HeroSection.module.css';

// Hand-drawn SVG doodles
function StarDoodle() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" className={styles.doodle}>
      <path d="M14 2L16.5 10.5L25 8L18.5 14L25 20L16.5 17.5L14 26L11.5 17.5L3 20L9.5 14L3 8L11.5 10.5L14 2Z"
        stroke="#FFE76B" strokeWidth="2" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function ArrowDoodle() {
  return (
    <svg width="60" height="30" viewBox="0 0 60 30" fill="none" aria-hidden="true" className={styles.doodleArrow}>
      <path d="M2 20 Q15 5 35 12 Q48 17 55 10" stroke="#FFE76B" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M50 6 L55 10 L51 15" stroke="#FFE76B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CrownDoodle() {
  return (
    <svg width="36" height="28" viewBox="0 0 36 28" fill="none" aria-hidden="true" className={styles.doodleCrown}>
      <path d="M4 22 L8 8 L18 16 L28 4 L32 18 L4 22Z" stroke="#0057D9" strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <path d="M4 22 L32 22" stroke="#0057D9" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="8" cy="8" r="2" fill="#FFE76B"/>
      <circle cx="28" cy="4" r="2" fill="#FFE76B"/>
      <circle cx="18" cy="16" r="2" fill="#FFE76B"/>
    </svg>
  );
}

function SmileyDoodle() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className={styles.doodleSmiley}>
      <circle cx="16" cy="16" r="13" stroke="#FF7F5A" strokeWidth="2"/>
      <circle cx="11" cy="13" r="2" fill="#FF7F5A"/>
      <circle cx="21" cy="13" r="2" fill="#FF7F5A"/>
      <path d="M10 19 Q16 24 22 19" stroke="#FF7F5A" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-label="ARTEVO Hero">
      {/* Cream background */}
      <div className={styles.bg} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Left — editorial content */}
        <div className={styles.content}>

          {/* Badge */}
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span>THE FIRST DROP</span>
          </div>

          {/* Headline — handwritten brand font */}
          <h1 className={styles.headline}>
            <span className={`${styles.headlineLine1} artevo-display`}>Your Wall.</span>
            <span className={`${styles.headlineLine2} artevo-display`}>Your Vibe.</span>
          </h1>

          {/* Decorative underline doodle */}
          <div className={styles.doodleUnderline} aria-hidden="true">
            <ArrowDoodle />
          </div>

          <p className={styles.sub}>
            A little piece that makes your space feel more like you.
          </p>

          {/* CTAs */}
          <div className={styles.actions}>
            <Link href="/shop" className={`${styles.primaryCta} btn-cobalt`} id="hero-shop-cta">
              <span>SHOP THE FIRST DROP</span>
              <ArrowRight size={16} className={styles.ctaArrow} />
            </Link>
            <Link href="/shop" className={styles.secondaryCta} id="hero-explore-cta">
              Explore the Room
            </Link>
          </div>

          {/* Trust indicators */}
          <div className={styles.trust}>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>🌿</span>
              <span>Natural Wood</span>
            </div>
            <div className={styles.trustDot} />
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>📦</span>
              <span>Fast Shipping</span>
            </div>
            <div className={styles.trustDot} />
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>❤️</span>
              <span>Made to Last</span>
            </div>
          </div>
        </div>

        {/* Right — hero image with doodles */}
        <div className={styles.visual}>
          {/* Doodle decorations */}
          <div className={styles.doodleGroup} aria-hidden="true">
            <div className={styles.doodleTopLeft}><StarDoodle /></div>
            <div className={styles.doodleTopRight}><CrownDoodle /></div>
            <div className={styles.doodleBottomLeft}><SmileyDoodle /></div>
          </div>

          {/* "The First Drop" badge */}
          <div className={styles.firstDropBadge} aria-hidden="true">
            <span className={`artevo-display ${styles.firstDropText}`}>The First</span>
            <span className={`artevo-display ${styles.firstDropDrop}`}>Drop</span>
          </div>

          {/* Hero image */}
          <div className={styles.imageWrap}>
            <Image
              src="/hero-model.png"
              alt="ARTEVO Wall Rack in a real room"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 900px) 100vw, 55vw"
              className={styles.heroImg}
            />
            <div className={styles.imgOverlay} aria-hidden="true" />
          </div>

          {/* Floating product label */}
          <div className={styles.floatCard}>
            <div className={styles.floatCardDot} />
            <div>
              <p className={styles.floatCardTitle}>ARTEVO Wall Rack</p>
              <p className={styles.floatCardSub}>Original Edition</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
