import { sql } from '@/lib/db';

/** One card in the "See it in your space" section */
export interface SpaceItem {
  mood: string;               // e.g. MINIMAL / COZY / CREATIVE
  product_id: string | null;  // product picked from the shop
  image_url?: string | null;  // optional lifestyle photo override (else product image)
}

export interface SpaceItemResolved extends SpaceItem {
  product: {
    id: string;
    title: string | null;
    image_url: string | null;
    price: number | null;
    final_price: number | null;
  } | null;
}

export const DEFAULT_SPACE_ITEMS: SpaceItem[] = [
  { mood: 'MINIMAL',  product_id: null, image_url: null },
  { mood: 'COZY',     product_id: null, image_url: null },
  { mood: 'CREATIVE', product_id: null, image_url: null },
];

let schemaReady = false;

/** Creates the table / new columns if missing. Safe to call many times. */
export async function ensureHomepageSchema() {
  if (schemaReady) return;
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
  await sql.unsafe(`
    ALTER TABLE homepage_settings
      ADD COLUMN IF NOT EXISTS hero_image_url  TEXT,
      ADD COLUMN IF NOT EXISTS hero_line1      TEXT DEFAULT 'Your Wall.',
      ADD COLUMN IF NOT EXISTS hero_line2      TEXT DEFAULT 'Your Vibe.',
      ADD COLUMN IF NOT EXISTS hero_subtitle   TEXT DEFAULT 'A little piece that makes your space feel more like you.',
      ADD COLUMN IF NOT EXISTS hero_cta_label  TEXT DEFAULT 'SHOP THE FIRST DROP',
      ADD COLUMN IF NOT EXISTS space_title     TEXT DEFAULT 'See it in your space.',
      ADD COLUMN IF NOT EXISTS space_subtitle  TEXT DEFAULT 'Different rooms. Same idea.\\nMake the space feel like yours.',
      ADD COLUMN IF NOT EXISTS space_items     JSONB,
      ADD COLUMN IF NOT EXISTS updated_at      TIMESTAMPTZ DEFAULT now();
  `);
  await sql.unsafe(`INSERT INTO homepage_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;`);
  schemaReady = true;
}

/** Loads settings + resolves featured product + "space" products. */
export async function getHomepageSettings() {
  await ensureHomepageSchema();

  const rows = await sql.unsafe(`
    SELECT h.*, row_to_json(p.*) AS product
    FROM homepage_settings h
    LEFT JOIN products p ON p.id = h.featured_product_id
    WHERE h.id = 1
  `);
  const settings: any = rows[0] ?? {};

  if (!settings.product) {
    const fallback = await sql.unsafe(
      `SELECT * FROM products WHERE is_active = true ORDER BY created_at DESC LIMIT 1`
    );
    if (fallback.length > 0) settings.product = fallback[0];
  }

  let rawSpaceItems = settings.space_items;
  if (typeof rawSpaceItems === 'string') {
    try { rawSpaceItems = JSON.parse(rawSpaceItems); } catch { rawSpaceItems = null; }
  }
  
  // Resolve "See it in your space" items
  const items: SpaceItem[] = Array.isArray(rawSpaceItems) && rawSpaceItems.length
    ? rawSpaceItems
    : DEFAULT_SPACE_ITEMS;
    
  settings.space_items = items;

  const UUID_RE = /^[0-9a-f-]{36}$/i;
  const ids = items.map(i => i.product_id).filter((id): id is string => !!id && UUID_RE.test(id));
  let productMap = new Map<string, any>();
  if (ids.length) {
    const prods = await sql.unsafe(
      `SELECT id, title, image_url, price, final_price
       FROM products WHERE id = ANY($1::uuid[]) AND is_active = true`,
      [`{${ids.join(',')}}`]
    );
    productMap = new Map(prods.map((p: any) => [p.id, p]));
  }

  settings.space_items_resolved = items.map(i => ({
    ...i,
    product: i.product_id ? productMap.get(i.product_id) ?? null : null,
  })) as SpaceItemResolved[];

  return settings;
}
