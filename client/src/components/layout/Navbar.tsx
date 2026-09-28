'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Heart, Search, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import CartDrawer from '@/components/cart/CartDrawer';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '/shop',  label: 'Shop' },
  { href: '/track', label: 'Track Order' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();

  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [cartOpen,    setCartOpen]    = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [pathname]);

  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>

          {/* Left — desktop nav */}
          <nav className={styles.navLinks} aria-label="Main navigation">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Center — ARTEVO logo */}
          <Link href="/" className={styles.logoWrapper} aria-label="ARTEVO Home">
            <Image
              src="/artevo-logo.jpg"
              alt="ARTEVO"
              width={120}
              height={44}
              style={{ objectFit: 'contain' }}
              priority
            />
          </Link>

          {/* Right — icons */}
          <div className={styles.actions}>
            {/* Search */}
            <button
              className={`${styles.iconBtn} ${styles.hideOnMobile}`}
              onClick={() => setSearchOpen(s => !s)}
              aria-label="Search"
              id="nav-search-btn"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className={`${styles.iconBtn} ${styles.hideOnMobile}`}
              aria-label={`Wishlist (${wishlistItems.length})`}
              id="nav-wishlist-btn"
            >
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <span className={styles.badge}>{wishlistItems.length}</span>
              )}
            </Link>

            {/* Bag */}
            <button
              className={`${styles.iconBtn} ${styles.bagBtn}`}
              onClick={() => setCartOpen(true)}
              aria-label={`Your Bag (${itemCount})`}
              id="nav-bag-btn"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className={styles.badge}>{itemCount}</span>
              )}
            </button>

            {/* Hamburger — mobile */}
            <button
              className={`${styles.iconBtn} ${styles.hamburger}`}
              onClick={() => setMenuOpen(m => !m)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              id="nav-menu-btn"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className={styles.searchBar}>
            <div className={styles.searchInner}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search ARTEVO…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                autoFocus
                onKeyDown={e => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                id="nav-search-input"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className={styles.clearBtn} aria-label="Clear search">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div className={styles.mobileMenu} aria-label="Mobile navigation" role="dialog" aria-modal="true">
          {/* Decorative doodle */}
          <div className={styles.mobileDoodle} aria-hidden="true">✦</div>

          <nav className={styles.mobileNav}>
            <Link href="/" className={styles.mobileLogoLink} onClick={() => setMenuOpen(false)}>
              <Image src="/artevo-logo.jpg" alt="ARTEVO" width={100} height={36} style={{ objectFit: 'contain' }} />
            </Link>

            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileLink} ${pathname === link.href ? styles.activeMobile : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className={styles.mobileLinkNum}>0{i + 1}</span>
                {link.label}
                <span className={styles.mobileLinkArrow}><ArrowRight size={18} /></span>
              </Link>
            ))}

            <button
              onClick={() => { setSearchOpen(true); setMenuOpen(false); }}
              className={styles.mobileExtraLink}
              id="mobile-search-btn"
            >
              <Search size={20} className={styles.mobileExtraIcon} />
              Search
            </button>

            <Link
              href="/wishlist"
              onClick={() => setMenuOpen(false)}
              className={styles.mobileExtraLink}
              id="mobile-wishlist-link"
            >
              <Heart size={20} className={styles.mobileExtraIcon} />
              Wishlist
              {wishlistItems.length > 0 && (
                <span className={styles.mobileBadge}>{wishlistItems.length}</span>
              )}
            </Link>
          </nav>

          <div className={styles.mobileMenuBottom}>
            <span className={styles.mobileMenuTag}>ARTEVO</span>
            <span className={styles.mobileMenuCopy}>Make space for your vibe.</span>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
