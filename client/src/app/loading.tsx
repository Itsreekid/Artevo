import React from 'react';

export default function GlobalLoading() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'var(--artevo-cream)',
      flexDirection: 'column',
      gap: '20px',
    }}>
      {/* Spinner ring */}
      <div style={{ position: 'relative', width: '56px', height: '56px' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          border: '2.5px solid var(--artevo-cream-dark)',
          borderTopColor: 'var(--artevo-cobalt)',
          borderRadius: '50%',
          animation: 'artevoSpin 0.9s linear infinite',
        }} />
        {/* Yellow dot accent */}
        <div style={{
          position: 'absolute',
          top: '-3px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '8px',
          height: '8px',
          background: 'var(--artevo-yellow)',
          borderRadius: '50%',
        }} />
      </div>

      {/* Brand wordmark */}
      <span style={{
        fontFamily: 'var(--font-jakarta, sans-serif)',
        fontSize: '13px',
        fontWeight: 800,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--artevo-cobalt)',
      }}>
        ARTEVO
      </span>

      <style>{`
        @keyframes artevoSpin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
