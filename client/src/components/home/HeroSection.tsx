'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from './HeroSection.module.css';

function UnderlineDoodle() {
  return (
    <svg width="180" height="12" viewBox="0 0 180 12" fill="none" aria-hidden="true" className={styles.doodleUnderline}>
      <path d="M2 10 Q60 2 120 6 Q150 8 178 4" stroke="#FFE76B" strokeWidth="4" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function StarDoodle() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles.doodleStar}>
      <path d="M12 2L14 9.5L21.5 11.5L14 13.5L12 21L10 13.5L2.5 11.5L10 9.5L12 2Z" fill="#FFE76B" stroke="#FFE76B" strokeLinejoin="round"/>
    </svg>
  );
}

interface HeroSectionProps {
  settings?: any;
}

export default function HeroSection({ settings = {} }: HeroSectionProps) {
  const p = settings.product;
  const imgUrl = p?.image_url || '/hero-artevo.png';
  const productUrl = p ? `/shop/${p.id}` : '/shop';
  const dropLabel = settings.drop_label || 'DROP 001';

  return (
    <section className={styles.hero} aria-label="ARTEVO Hero">
      <div className={styles.inner}>
        {/* LEFT: Content */}
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            ✦ {dropLabel}
          </div>

          <h1 className={`${styles.headline} artevo-display`}>
            <div className={styles.headlineRow}>
              <span className={styles.textInk}>Your Wall.</span>
              <div className={styles.starWrap}><StarDoodle /></div>
            </div>
            <div className={styles.headlineRow}>
              <span className={styles.textCobalt}>Your Vibe.</span>
              <div className={styles.underlineWrap} aria-hidden="true">
                <UnderlineDoodle />
              </div>
            </div>
          </h1>

          <p className={styles.sub}>
            A little piece that makes your space feel more like you.
          </p>

          <div className={styles.actions}>
            <Link href={productUrl} className={`${styles.primaryCta} btn-cobalt`} id="hero-shop-cta">
              <span>SHOP THE FIRST DROP</span>
              <ArrowRight size={18} className={styles.ctaArrow} />
            </Link>
          </div>

          <div className={styles.benefits}>
            <span>Natural Wood</span>
            <span className={styles.benefitDot}>·</span>
            <span>Easy to Mount</span>
            <span className={styles.benefitDot}>·</span>
            <span>Made to Last</span>
          </div>
        </div>

        {/* RIGHT: Image */}
        <div className={styles.visual}>
          <div className={styles.imageWrap}>
            <Image
              src={imgUrl}
              alt={p?.title || "ARTEVO Wall Rack in a real room"}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 900px) 100vw, 55vw"
              className={styles.heroImg}
            />
          </div>

          <div className={styles.productLabel}>
            <p className={styles.labelEyebrow}>✦ {dropLabel}</p>
            <p className={styles.labelTitle}>{p?.title || 'ARTEVO Wall Rack'}</p>
            <p className={styles.labelSub}>Original Edition</p>
          </div>
        </div>
      </div>
    </section>
  );
}
