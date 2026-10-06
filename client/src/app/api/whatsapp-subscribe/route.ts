import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    const cleanPhone = phone ? phone.replace(/\D/g, '') : '';
    if (!cleanPhone || cleanPhone.length < 8) {
      return NextResponse.json({ error: 'Valid phone number is required.' }, { status: 400 });
    }

    // Ensure the table exists
    await sql.unsafe(`
      CREATE TABLE IF NOT EXISTS whatsapp_subscribers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        phone TEXT UNIQUE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `);

    // Insert the phone, ignoring if it already exists
    await sql.unsafe(`
      INSERT INTO whatsapp_subscribers (phone) 
      VALUES ($1)
      ON CONFLICT (phone) DO NOTHING;
    `, [cleanPhone]);

    return NextResponse.json({ success: true, message: 'Subscribed successfully!' });
  } catch (err: any) {
    console.error('[API /whatsapp-subscribe] Error:', err.message);
    return NextResponse.json({ error: 'Failed to subscribe.' }, { status: 500 });
  }
}
