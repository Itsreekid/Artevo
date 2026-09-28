/**
 * One-time migration: strip 'nyvarastore/' prefix from all image URLs
 * stored across products, color_options, and product_images tables.
 *
 * Run with: node fix-image-urls.mjs
 */
import postgres from 'postgres';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set.');
  process.exit(1);
}

const sql = postgres(DATABASE_URL, { ssl: false });
const OLD_PREFIX = 'nyvarastore/';

async function run() {
  console.log('🔍 Scanning for URLs containing "nyvarastore/"...\n');

  // 1. products.image_url
  const p1 = await sql`
    UPDATE products
    SET image_url = REPLACE(image_url, ${`https://pub-3ef72613dbf24e238b4f448dc5ae67a3.r2.dev/nyvarastore/`}, ${`https://pub-3ef72613dbf24e238b4f448dc5ae67a3.r2.dev/`})
    WHERE image_url LIKE ${'%nyvarastore/%'}
    RETURNING id, image_url`;
  console.log(`✅ products.image_url         → ${p1.length} row(s) updated`);

  // 2. color_options.image_url
  const co1 = await sql`
    UPDATE color_options
    SET image_url = REPLACE(image_url, ${`https://pub-3ef72613dbf24e238b4f448dc5ae67a3.r2.dev/nyvarastore/`}, ${`https://pub-3ef72613dbf24e238b4f448dc5ae67a3.r2.dev/`})
    WHERE image_url LIKE ${'%nyvarastore/%'}
    RETURNING id, image_url`;
  console.log(`✅ color_options.image_url    → ${co1.length} row(s) updated`);

  // 3. color_options.image_url2
  const co2 = await sql`
    UPDATE color_options
    SET image_url2 = REPLACE(image_url2, ${`https://pub-3ef72613dbf24e238b4f448dc5ae67a3.r2.dev/nyvarastore/`}, ${`https://pub-3ef72613dbf24e238b4f448dc5ae67a3.r2.dev/`})
    WHERE image_url2 LIKE ${'%nyvarastore/%'}
    RETURNING id, image_url2`;
  console.log(`✅ color_options.image_url2   → ${co2.length} row(s) updated`);

  // 4. product_images.image_url
  const pi = await sql`
    UPDATE product_images
    SET image_url = REPLACE(image_url, ${`https://pub-3ef72613dbf24e238b4f448dc5ae67a3.r2.dev/nyvarastore/`}, ${`https://pub-3ef72613dbf24e238b4f448dc5ae67a3.r2.dev/`})
    WHERE image_url LIKE ${'%nyvarastore/%'}
    RETURNING id, image_url`;
  console.log(`✅ product_images.image_url   → ${pi.length} row(s) updated`);

  const total = p1.length + co1.length + co2.length + pi.length;
  console.log(`\n🎉 Done! Total rows updated: ${total}`);

  await sql.end();
}

run().catch(err => {
  console.error('❌ Migration failed:', err.message);
  process.exit(1);
});
