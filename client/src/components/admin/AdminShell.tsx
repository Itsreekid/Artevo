'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, ShoppingCart, Package,
  LogOut, Tag, Menu, X, Users, Megaphone, TrendingUp, Home
} from 'lucide-react';
import { logoutAction } from '@/app/admin/actions';
import { useOrderNotification } from '@/hooks/useOrderNotification';
import OrderToast from '@/components/admin/OrderToast';
import ErrorToast from '@/components/admin/ErrorToast';
import SuccessToast from '@/components/admin/SuccessToast';
import type { Order } from '@/types';

interface Props {
  role: string;
  children: React.ReactNode;
}

export default function AdminShell({ role, children }: Props) {
  const pathname = usePathname();
  const [newOrder, setNewOrder] = useState<Order | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isAdmin = role === 'admin';

  useOrderNotification({ onNewOrder: (order) => setNewOrder(order) });

  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  const NavLink = ({ href, icon: Icon, children: label, exact = false }: {
    href: string; icon: any; children: React.ReactNode; exact?: boolean;
  }) => {
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    return (
      <Link
        href={href}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 16px',
          borderRadius: '10px',
          fontWeight: 600,
          fontSize: '14px',
          transition: 'all 150ms ease',
          textDecoration: 'none',
          color: isActive ? '#0057D9' : '#6B6B6B',
          background: isActive ? 'rgba(0,87,217,0.08)' : 'transparent',
          borderLeft: isActive ? '3px solid #0057D9' : '3px solid transparent',
        }}
      >
        <Icon size={18} />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#F5EDDB', color: '#1B1B1B', overflow: 'hidden', fontFamily: 'var(--font-jakarta, sans-serif)' }}>
      <OrderToast order={newOrder} onClose={() => setNewOrder(null)} />
      <ErrorToast />
      <SuccessToast />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(27,27,27,0.5)', zIndex: 40, backdropFilter: 'blur(2px)' }}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 50,
        width: '260px',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 20px rgba(0,0,0,0.06)',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 300ms ease',
      }}
      className="md-sidebar"
      >
        {/* Logo area */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #F0EDE8', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.01em', color: '#0057D9' }}>ARTEVO</div>
            <div style={{ fontSize: '11px', color: '#6B6B6B', fontWeight: 500, marginTop: '2px' }}>Admin Dashboard</div>
          </div>
          <button style={{ display: 'flex', cursor: 'pointer', border: 'none', background: 'none', color: '#6B6B6B', padding: '4px' }} onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
          {isAdmin && <NavLink href="/admin" icon={LayoutDashboard} exact>Dashboard</NavLink>}
          <NavLink href="/admin/orders" icon={ShoppingCart}>Orders</NavLink>
          <NavLink href="/admin/preparation" icon={Package}>Preparation</NavLink>
          {isAdmin && <NavLink href="/admin/products" icon={Package}>Products</NavLink>}
          {isAdmin && <NavLink href="/admin/categories" icon={Tag}>Categories</NavLink>}
          {isAdmin && <NavLink href="/admin/homepage" icon={Home}>Homepage</NavLink>}
          {isAdmin && <NavLink href="/admin/employees" icon={Users}>Team</NavLink>}
          {isAdmin && <NavLink href="/admin/catalog-ad" icon={Megaphone}>Catalog Ad</NavLink>}
          {isAdmin && <NavLink href="/admin/trending" icon={TrendingUp}>Trending</NavLink>}
        </nav>

        {/* Logout */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid #F0EDE8' }}>
          <form action={logoutAction}>
            <button type="submit" style={{
              display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
              padding: '10px 16px', borderRadius: '10px', cursor: 'pointer',
              border: 'none', background: 'none', fontFamily: 'inherit',
              color: '#EF4444', fontWeight: 600, fontSize: '14px',
              transition: 'background 150ms',
            }}
            onMouseOver={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.08)')}
            onMouseOut={e => (e.currentTarget.style.background = 'none')}
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden', marginLeft: '0' }}>
        {/* Top header */}
        <header style={{
          height: '68px',
          background: '#FFFFFF',
          borderBottom: '1px solid #F0EDE8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 28px',
          boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
          zIndex: 10,
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              style={{ display: 'flex', cursor: 'pointer', border: 'none', background: 'none', color: '#6B6B6B', padding: '6px' }}
              onClick={() => setSidebarOpen(true)}
              aria-label="Toggle menu"
            >
              <Menu size={22} />
            </button>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#1B1B1B' }}>
              {isAdmin ? 'Admin Space' : 'Team Space'}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#1B1B1B' }}>{isAdmin ? 'Admin' : 'Employee'}</div>
              <div style={{ fontSize: '12px', color: '#6B6B6B' }}>ARTEVO Team</div>
            </div>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: '#0057D9', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: '#FFFFFF', fontWeight: 800, fontSize: '16px',
            }}>
              {isAdmin ? 'A' : 'E'}
            </div>
          </div>
        </header>

        {/* Scrollable main */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '28px', background: '#FFF8EC' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {children}
          </div>
        </main>
      </div>

      {/* Desktop sidebar always visible via CSS */}
      <style>{`
        @media (min-width: 768px) {
          .md-sidebar {
            position: relative !important;
            transform: translateX(0) !important;
            flex-shrink: 0;
          }
        }
      `}</style>
    </div>
  );
}
