import { sql } from '@/lib/db';
import adminStyles from '@/app/admin/admin.module.css';
import { MessageCircle, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function WhatsAppAdminPage() {
  let subscribers = [];
  try {
    subscribers = await sql`
      SELECT id, phone, created_at
      FROM whatsapp_subscribers
      ORDER BY created_at DESC
    `;
  } catch (err: any) {
    // If table doesn't exist yet, it will fail gracefully
    console.error('[Admin/WhatsApp] Error fetching subscribers:', err.message);
  }

  return (
    <div>
      <div className={adminStyles.pageHeader}>
        <h1 className={adminStyles.pageTitle}>💬 WhatsApp Subscribers</h1>
        <div style={{ background: '#DCFCE7', color: '#166534', padding: '6px 12px', borderRadius: '16px', fontWeight: 600, fontSize: '13px' }}>
          {subscribers.length} Subscriber{subscribers.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        {subscribers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6B7280' }}>
            <MessageCircle size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
            <p style={{ fontSize: '16px', fontWeight: 500 }}>No subscribers yet.</p>
            <p style={{ fontSize: '14px', marginTop: '8px' }}>When users subscribe, their phone numbers will appear here.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F0EDE8', color: '#6B6B6B', fontSize: '14px' }}>
                  <th style={{ padding: '16px', fontWeight: 600 }}>WhatsApp Number</th>
                  <th style={{ padding: '16px', fontWeight: 600 }}>Date Subscribed</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub: any) => (
                  <tr key={sub.id} style={{ borderBottom: '1px solid #F0EDE8', transition: 'background 150ms' }} onMouseOver={(e) => e.currentTarget.style.background = '#F9FAFB'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '16px', fontWeight: 600, color: '#1B1B1B', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ background: '#DCFCE7', padding: '8px', borderRadius: '50%', color: '#166534' }}>
                        <MessageCircle size={16} />
                      </div>
                      {sub.phone}
                    </td>
                    <td style={{ padding: '16px', color: '#6B6B6B', fontSize: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar size={14} />
                        {new Date(sub.created_at).toLocaleString('fr-FR', {
                          day: '2-digit', month: '2-digit', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
