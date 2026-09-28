import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// One-time migration route — DELETE THIS FILE after running once.
// GET /api/admin/fix-image-urls?secret=artevo-migrate-2026
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('secret') !== 'artevo-migrate-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const OLD = 'https://pub-3ef72613dbf24e238b4f448dc5ae67a3.r2.dev/nyvarastore/';
  const NEW = 'https://pub-3ef72613dbf24e238b4f448dc5ae67a3.r2.dev/';

  const p1 = await sql`
    UPDATE products
    SET image_url = REPLACE(image_url, ${OLD}, ${NEW})
    WHERE image_url LIKE ${'%nyvarastore/%'}
    RETURNING id`;

  const co1 = await sql`
    UPDATE color_options
    SET image_url = REPLACE(image_url, ${OLD}, ${NEW})
    WHERE image_url LIKE ${'%nyvarastore/%'}
    RETURNING id`;

  const co2 = await sql`
    UPDATE color_options
    SET image_url2 = REPLACE(image_url2, ${OLD}, ${NEW})
    WHERE image_url2 LIKE ${'%nyvarastore/%'}
    RETURNING id`;

  const pi = await sql`
    UPDATE product_images
    SET image_url = REPLACE(image_url, ${OLD}, ${NEW})
    WHERE image_url LIKE ${'%nyvarastore/%'}
    RETURNING id`;

  return NextResponse.json({
    success: true,
    updated: {
      'products.image_url': p1.length,
      'color_options.image_url': co1.length,
      'color_options.image_url2': co2.length,
      'product_images.image_url': pi.length,
      total: p1.length + co1.length + co2.length + pi.length,
    },
  });
}
