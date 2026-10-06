'use client';

import { useState } from 'react';
import styles from '@/app/home.module.css';

export default function WhatsAppForm() {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/whatsapp-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      if (!res.ok) throw new Error('Subscription failed');
      
      setStatus('success');
      setPhone('');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div>
      {status === 'success' ? (
        <div style={{ padding: '16px', background: 'rgba(255,255,255,0.1)', borderRadius: '32px', color: '#fff', fontSize: '18px', fontWeight: '600' }}>
          Thanks for subscribing! You're on the list.
        </div>
      ) : (
        <form className={styles.emailForm} onSubmit={handleSubmit}>
          <input 
            type="tel" 
            placeholder="YOUR WHATSAPP NUMBER" 
            className={styles.emailInput} 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required 
            disabled={status === 'loading'}
          />
          <button type="submit" className={styles.emailBtn} disabled={status === 'loading'}>
            {status === 'loading' ? 'JOINING...' : 'JOIN ARTEVO →'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p style={{ color: '#ffb3b3', marginTop: '12px', fontSize: '14px' }}>Something went wrong. Please try again.</p>
      )}
    </div>
  );
}
