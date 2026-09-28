import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      textAlign: 'center',
      padding: '24px',
      backgroundColor: 'var(--artevo-cream)',
      color: 'var(--artevo-ink)',
    }}>
      {/* Doodle star */}
      <div style={{ marginBottom: '8px', fontSize: '28px' }}>✦</div>

      <h1 style={{
        fontFamily: 'var(--font-caveat, cursive)',
        fontSize: 'clamp(5rem, 10vw, 9rem)',
        color: 'var(--artevo-cobalt)',
        margin: '0',
        lineHeight: 1,
      }}>404</h1>

      <h2 style={{
        fontSize: '20px',
        fontWeight: 700,
        marginTop: '16px',
        marginBottom: '12px',
        color: 'var(--artevo-ink)',
        letterSpacing: '0.02em',
      }}>Page not found</h2>

      <p style={{
        color: 'var(--artevo-grey)',
        maxWidth: '360px',
        lineHeight: 1.65,
        marginBottom: '36px',
        fontSize: '15px',
      }}>
        Looks like this wall is bare. Let&apos;s get you back to the good stuff.
      </p>

      {/* Yellow accent underline decoration */}
      <div style={{
        width: '48px',
        height: '4px',
        background: 'var(--artevo-yellow)',
        borderRadius: '2px',
        marginBottom: '32px',
      }} />

      <Link href="/shop" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        height: '48px',
        padding: '0 32px',
        backgroundColor: 'var(--artevo-cobalt)',
        color: 'var(--artevo-white)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        fontSize: '13px',
        textDecoration: 'none',
        borderRadius: 'var(--radius-full)',
        boxShadow: 'var(--shadow-cobalt)',
        transition: 'background 0.15s ease',
      }}>
        Shop the First Drop →
      </Link>

      <Link href="/" style={{
        marginTop: '16px',
        fontSize: '14px',
        color: 'var(--artevo-grey)',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
      }}>
        Back to home
      </Link>
    </div>
  );
}
