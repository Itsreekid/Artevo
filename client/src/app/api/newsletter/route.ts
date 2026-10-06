import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    // Ensure the table exists
    await sql.unsafe(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `);

    // Insert the email, ignoring if it already exists
    await sql.unsafe(`
      INSERT INTO newsletter_subscribers (email) 
      VALUES ($1)
      ON CONFLICT (email) DO NOTHING;
    `, [email.toLowerCase().trim()]);

    return NextResponse.json({ success: true, message: 'Subscribed successfully!' });
  } catch (err: any) {
    console.error('[API /newsletter] Error:', err.message);
    return NextResponse.json({ error: 'Failed to subscribe.' }, { status: 500 });
  }
}
