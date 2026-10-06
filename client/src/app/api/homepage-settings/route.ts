import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Ensure table exists
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
    `);
    
    // Ensure default row exists
    await sql.unsafe(`INSERT INTO homepage_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;`);

    // Fetch settings with product data
    const rows = await sql.unsafe(`
      SELECT 
        h.*,
        row_to_json(p.*) as product
      FROM homepage_settings h
      LEFT JOIN products p ON p.id = h.featured_product_id
      WHERE h.id = 1
    `);

    // If no product is selected, try to get the newest active product as fallback
    let settings = rows[0];
    if (!settings.product) {
      const newestProductRows = await sql.unsafe(`
        SELECT * FROM products WHERE is_active = true ORDER BY created_at DESC LIMIT 1
      `);
      if (newestProductRows.length > 0) {
        settings.product = newestProductRows[0];
      }
    }

    return NextResponse.json(settings);
  } catch (err: any) {
    console.error('[API /homepage-settings] Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      featured_product_id,
      drop_label,
      headline,
      subtitle,
      description,
      enabled
    } = body;

    const rows = await sql.unsafe(`
      UPDATE homepage_settings
      SET 
        featured_product_id = $1,
        drop_label = $2,
        headline = $3,
        subtitle = $4,
        description = $5,
        enabled = $6
      WHERE id = 1
      RETURNING *
    `, [
      featured_product_id || null,
      drop_label,
      headline,
      subtitle,
      description,
      enabled
    ]);

    return NextResponse.json(rows[0]);
  } catch (err: any) {
    console.error('[API /homepage-settings PUT] Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
