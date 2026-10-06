import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getHomepageSettings } from '@/lib/homepage-settings';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await getHomepageSettings();
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
      enabled,
      hero_image_url,
      hero_line1,
      hero_line2,
      hero_subtitle,
      hero_cta_label,
      space_title,
      space_subtitle,
      space_items
    } = body;

    const rows = await sql.unsafe(`
      UPDATE homepage_settings
      SET 
        featured_product_id = $1,
        drop_label = $2,
        headline = $3,
        subtitle = $4,
        description = $5,
        enabled = $6,
        hero_image_url = $7,
        hero_line1 = $8,
        hero_line2 = $9,
        hero_subtitle = $10,
        hero_cta_label = $11,
        space_title = $12,
        space_subtitle = $13,
        space_items = $14,
        updated_at = now()
      WHERE id = 1
      RETURNING *
    `, [
      featured_product_id || null,
      drop_label,
      headline,
      subtitle,
      description,
      enabled,
      hero_image_url,
      hero_line1,
      hero_line2,
      hero_subtitle,
      hero_cta_label,
      space_title,
      space_subtitle,
      space_items ? JSON.stringify(space_items) : null
    ]);

    return NextResponse.json(rows[0]);
  } catch (err: any) {
    console.error('[API /homepage-settings PUT] Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
