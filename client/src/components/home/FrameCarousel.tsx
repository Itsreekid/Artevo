'use client';

import Image from 'next/image';
import styles from './FrameCarousel.module.css';

const ROOMS = [
  {
    id: 'entryway',
    label: 'Entryway Energy',
    emoji: '🔑',
    desc: 'Keys. Jackets. Bags. Done.',
    color: '#0057D9',
    img: '/hero-model.png', // Will use real product image
  },
  {
    id: 'bedroom',
    label: 'Bedroom Vibes',
    emoji: '✨',
    desc: 'Your everyday pieces, right where you need them.',
    color: '#FF7F5A',
    img: '/hero-model.png',
  },
  {
    id: 'minimal',
    label: 'Minimal & Modern',
    emoji: '🌿',
    desc: 'Less clutter. More character.',
    color: '#1B1B1B',
    img: '/hero-model.png',
  },
];

export default function FrameCarousel() {
  return (
    <section className={styles.section} id="rooms" aria-label="Room Ideas">
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <p className={`${styles.eyebrow} artevo-display`}>Made for real rooms.</p>
          <h2 className={styles.headline}>
            Your space. <span className={styles.headlineAccent}>Your story.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className={styles.grid}>
          {ROOMS.map(room => (
            <div key={room.id} className={styles.card} id={`room-card-${room.id}`}>
              <div className={styles.cardImg}>
                <Image
                  src={room.img}
                  alt={room.label}
                  fill
                  className={styles.cardImage}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className={styles.cardOverlay} style={{ background: `linear-gradient(to top, ${room.color}CC 0%, transparent 55%)` }} />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardEmoji}>{room.emoji}</span>
                <h3 className={`${styles.cardTitle} artevo-display`}>{room.label}</h3>
                <p className={styles.cardDesc}>{room.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={styles.bottom}>
          <p className={styles.bottomText}>
            One rack. Endless setups.
          </p>
        </div>
      </div>
    </section>
  );
}
