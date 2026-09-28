import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import styles from './home.module.css';

export const metadata: Metadata = {
  title:       'ARTEVO — Make Space for Your Vibe',
  description: 'The ARTEVO Wall Rack. A little piece that makes your space feel more like you. Natural wood. Easy to mount. Drop 001.',
  openGraph: {
    title:       'ARTEVO — Your Wall. Your Vibe.',
    description: 'Shop Drop 001. Natural wood wall racks for real rooms.',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* ─── SHOP THE VIBE ─── */}
      <section className={styles.section} aria-labelledby="shop-vibe">
        <div className={styles.sectionHeader}>
          <h2 id="shop-vibe" className={styles.sectionTitle}>Shop the Vibe.</h2>
          <p className={styles.sectionSub}>
            Pieces for walls, corners, shelves and everything in between.
          </p>
        </div>
        
        <div className={styles.vibeGrid}>
          <Link href="/shop" className={`${styles.vibeCard} ${styles.vibeCardLink}`}>
            <Image src="/hero-artevo.png" alt="Wall category" fill className={styles.vibeCardImg} />
            <div className={styles.vibeCardOverlay} />
            <div className={styles.vibeCardContent}>
              <span className={styles.vibeCardTitle}>WALL</span>
            </div>
          </Link>
          <div className={styles.vibeCard}>
            <div className={styles.vibeCardContent}>
              <span className={`${styles.vibeCardTitle} ${styles.textInk}`}>LIGHT</span>
              <span className={styles.vibeCardSoon}>SOON</span>
            </div>
          </div>
          <div className={styles.vibeCard}>
            <div className={styles.vibeCardContent}>
              <span className={`${styles.vibeCardTitle} ${styles.textInk}`}>DECOR</span>
              <span className={styles.vibeCardSoon}>SOON</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DROP 001 SPOTLIGHT ─── */}
      <section className={styles.spotlight}>
        <div className={styles.spotlightImgWrap}>
          <Image src="/hero-artevo.png" alt="ARTEVO Wall Rack close up" fill className={styles.heroImg} style={{objectFit: 'cover'}} />
        </div>
        <div className={styles.spotlightContent}>
          <span className={styles.spotlightDrop}>DROP 001</span>
          <h2 className={`${styles.spotlightTitle} artevo-display`}>THE WALL RACK.</h2>
          <p className={styles.spotlightQuote}>
            A little thing.<br/>
            A completely different wall.
          </p>
          <p className={styles.spotlightDesc}>
            Made from natural wood and designed to turn everyday storage into part of the room.
          </p>
          <p className={styles.spotlightPrice}>95.00 TND</p>
          <Link href="/shop/1" className="btn-cobalt" style={{display: 'inline-flex', padding: '16px 36px', borderRadius: '50px', color: '#fff', background: '#0057D9', textDecoration: 'none', fontWeight: 700, gap: '8px', alignItems: 'center'}}>
            SHOP DROP 001 <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ─── SEE IT IN YOUR SPACE ─── */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>See it in your space.</h2>
          <p className={styles.sectionSub}>
            Different rooms. Same idea.<br/>Make the space feel like yours.
          </p>
        </div>
        <div className={styles.spaceGrid}>
          {['MINIMAL', 'COZY', 'CREATIVE', 'EVERYDAY'].map(mood => (
            <div key={mood} className={styles.spaceCard}>
              <Image src="/hero-artevo.png" alt={mood} fill style={{objectFit: 'cover', opacity: 0.8}} />
              <div className={styles.spaceLabel}>{mood}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── MADE FOR REAL ROOMS ─── */}
      <section className={styles.philosophy}>
        <h2 className={styles.sectionTitle}>Made for real rooms.</h2>
        <div className={styles.philosophyGrid}>
          <div className={styles.philosophyItem}>
            <span className={styles.philosophyNum}>01</span>
            <h3 className={styles.philosophyTitle}>Made to<br/>be seen</h3>
            <p className={styles.philosophyDesc}>Objects that deserve a place in the room.</p>
          </div>
          <div className={styles.philosophyItem}>
            <span className={styles.philosophyNum}>02</span>
            <h3 className={styles.philosophyTitle}>Small space.<br/>Big personality.</h3>
            <p className={styles.philosophyDesc}>Pieces that help your space feel more like you.</p>
          </div>
          <div className={styles.philosophyItem}>
            <span className={styles.philosophyNum}>03</span>
            <h3 className={styles.philosophyTitle}>No boring<br/>walls.</h3>
            <p className={styles.philosophyDesc}>Because the walls around you should say something about you.</p>
          </div>
        </div>
      </section>

      {/* ─── SHOW US YOUR WALL ─── */}
      <section className={styles.section}>
        <div className={styles.sectionHeader} style={{alignItems: 'center', textAlign: 'center'}}>
          <h2 className={styles.sectionTitle}>Show us your wall.</h2>
        </div>
        
        <div className={styles.ugcPlaceholder}>
          <p className={styles.ugcTitle}>Your wall deserves a spot here.</p>
          <p className={styles.ugcDesc}>Tag @ARTEVO in your setup and show us how you made it yours.</p>
          <span className={styles.ugcSoon}>COMING SOON</span>
        </div>

        <div className={styles.socialFooter}>
          <a href="https://www.instagram.com/artevo_tn/" target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>FOLLOW @ARTEVO →</a>
        </div>
      </section>

      {/* ─── MORE PIECES ARE COMING ─── */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>More pieces are coming.</h2>
          <p className={styles.sectionSub}>DROP 001 is only the beginning.</p>
        </div>
        <div className={styles.comingGrid}>
          <div className={styles.comingCard}>
            <span className={styles.comingDrop}>DROP 002</span>
            <h3 className={styles.comingTitle}>LIGHT</h3>
            <span className={styles.comingSoon}>SOON</span>
          </div>
          <div className={styles.comingCard}>
            <span className={styles.comingDrop}>DROP 003</span>
            <h3 className={styles.comingTitle}>OBJECTS</h3>
            <span className={styles.comingSoon}>SOON</span>
          </div>
          <div className={styles.comingCard}>
            <span className={styles.comingDrop}>DROP 004</span>
            <h3 className={styles.comingTitle}>STORAGE</h3>
            <span className={styles.comingSoon}>SOON</span>
          </div>
        </div>
      </section>

      {/* ─── EMAIL SIGNUP ─── */}
      <section className={styles.emailSection}>
        <h2 className={styles.emailTitle}>DON&apos;T MISS THE NEXT DROP.</h2>
        <p className={styles.emailSub}>New pieces. Fresh ideas. Good walls.</p>
        <form className={styles.emailForm} action="/api/newsletter" method="POST">
          <input type="email" placeholder="YOUR EMAIL" className={styles.emailInput} required />
          <button type="button" className={styles.emailBtn}>JOIN ARTEVO →</button>
        </form>
      </section>
    </>
  );
}
