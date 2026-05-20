import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getAdmin, createAdmin } from '@/lib/db';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { action, email, password } = await req.json();

  if (action === 'login') {
    const admin = getAdmin(email);
    if (!admin) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const token = await signToken({ email: admin.email, id: admin.id });
    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    return NextResponse.json({ success: true });
  }

  if (action === 'setup') {
    const existing = getAdmin(email);
    if (existing) return NextResponse.json({ error: 'Admin already exists' }, { status: 400 });
    const hash = await bcrypt.hash(password, 12);
    createAdmin(email, hash);
    return NextResponse.json({ success: true });
  }

  if (action === 'logout') {
    const cookieStore = await cookies();
    cookieStore.delete('admin_token');
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

export async function GET() {
  const { getSession } = await import('@/lib/auth');
  const session = await getSession();
  return NextResponse.json({ authenticated: !!session, email: session?.email });
}
