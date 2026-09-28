'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useFeaturedProducts } from '@/hooks/useProducts';
import styles from './FeaturedProducts.module.css';

export default function FeaturedProducts() {
  const { products, loading } = useFeaturedProducts(6);

  return (
    <section className={styles.section} id="featured" aria-label="Featured Products">
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {/* Eyebrow — handwritten */}
            <p className={`${styles.eyebrow} artevo-display`}>Meet the first piece.</p>
            <h2 className={styles.headline}>
              The ARTEVO Wall Rack
              <span className={styles.headlineAccent}> —</span>
            </h2>
            <p className={styles.desc}>
              Simple. Functional. Timeless. A natural wood wall rack that brings order,
              warmth and character to your everyday spaces.
            </p>
          </div>
          <Link href="/shop" className={styles.viewAll} id="featured-view-all">
            View all drops <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <div className={styles.loadingWrap}>
            <LoadingSpinner size="lg" color="gold" />
          </div>
        ) : products.length === 0 ? (
          <div className={styles.emptyWrap}>
            <div className={styles.emptyIcon}>🌿</div>
            <p className={styles.emptyTitle}>New pieces dropping soon</p>
            <p className={styles.emptyText}>Check back — good stuff is coming.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 3} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
