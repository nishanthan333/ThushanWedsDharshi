import { NextRequest, NextResponse } from 'next/server';
import { getWeddingInfo, updateWeddingInfo } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  return NextResponse.json(getWeddingInfo());
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const allowed = [
      'couple_names', 'ceremony_date', 'ceremony_time', 'ceremony_venue', 'ceremony_address',
      'reception_date', 'reception_time', 'reception_venue', 'reception_address',
      'welcome_message', 'hashtag', 'rsvp_deadline',
    ];
    const filtered = Object.fromEntries(
      Object.entries(body).filter(([k]) => allowed.includes(k))
    );
    updateWeddingInfo(filtered);
    return NextResponse.json({ success: true, data: getWeddingInfo() });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
