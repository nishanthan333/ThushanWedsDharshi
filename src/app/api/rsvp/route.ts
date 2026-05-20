import { NextRequest, NextResponse } from 'next/server';
import { insertRsvp, getRsvps } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    insertRsvp({
      name: body.name.trim(),
      email: body.email?.trim() || '',
      phone: body.phone?.trim() || '',
      attending_ceremony: body.attending_ceremony ? 1 : 0,
      attending_reception: body.attending_reception ? 1 : 0,
      guest_count: Number(body.guest_count) || 1,
      dietary: body.dietary?.trim() || '',
      message: body.message?.trim() || '',
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(getRsvps());
}
