import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    if (searchParams.get('secret') !== 'artevo-admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Create homepage settings table if it doesn't exist
    await sql.unsafe(`
      CREATE TABLE IF NOT EXISTS homepage_settings (
        id INTEGER PRIMARY KEY DEFAULT 1,
        featured_product_id UUID REFERENCES products(id) ON DELETE SET NULL,
        drop_label TEXT DEFAULT 'DROP 001',
        headline TEXT DEFAULT 'THE WALL RACK.',
        subtitle TEXT DEFAULT 'A little thing.\\nA completely different wall.',
        description TEXT DEFAULT 'Made from natural wood and designed to turn everyday storage into part of the room.',
        enabled BOOLEAN DEFAULT true
      );
      
      -- Insert default row if not exists
      INSERT INTO homepage_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
    `);

    const rows = await sql.unsafe(`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`);
    return NextResponse.json({ success: true, tables: rows });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
