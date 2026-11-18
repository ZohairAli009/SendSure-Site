import { NextResponse } from 'next/server';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    // Honeypot: quietly accept automated submissions without storing them.
    if (typeof body.website === 'string' && body.website.trim()) return NextResponse.json({ ok: true });
    if (email.length > 254 || !emailPattern.test(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SECRET_KEY;
    if (!url || !key) return NextResponse.json({ error: 'The early-access list is not connected yet. Please try again later.' }, { status: 503 });
    const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/waitlist`, {
      // Supabase sb_secret_* API keys are not JWTs; send them as apikey only.
      method: 'POST', headers: { apikey: key, 'Content-Type': 'application/json', Prefer: 'resolution=ignore-duplicates,return=minimal' },
      body: JSON.stringify({ email }), cache: 'no-store',
    });
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Waitlist insert failed: ${response.status} ${response.statusText}; allow=${response.headers.get('allow') ?? 'none'}; body=${errorBody || '(empty)'}`);
      return NextResponse.json({ error: 'We could not save your email just now. Please try again.' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'We could not process that request. Please try again.' }, { status: 400 });
  }
}
