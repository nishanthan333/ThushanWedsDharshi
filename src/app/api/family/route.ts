import { NextRequest, NextResponse } from 'next/server';
import { getFamilyMembers, addFamilyMember, updateFamilyMember, deleteFamilyMember } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  return NextResponse.json(getFamilyMembers());
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  addFamilyMember({
    name: body.name,
    relation: body.relation,
    side: body.side,
    parent_id: body.parent_id || null,
    photo_url: body.photo_url || null,
    description: body.description || null,
    sort_order: body.sort_order || 0,
  });
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, ...data } = await req.json();
  updateFamilyMember(Number(id), data);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await req.json();
  deleteFamilyMember(Number(id));
  return NextResponse.json({ success: true });
}
