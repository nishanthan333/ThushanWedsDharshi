import { NextRequest, NextResponse } from 'next/server';
import { getGallery, addGalleryItem, deleteGalleryItem } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  return NextResponse.json(getGallery());
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  if (!body.url) return NextResponse.json({ error: 'URL required' }, { status: 400 });

  addGalleryItem({
    url: body.url,
    title: body.title || '',
    description: body.description || '',
    category: body.category || 'memory',
    sort_order: body.sort_order || 0,
  });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await req.json();
  deleteGalleryItem(Number(id));
  return NextResponse.json({ success: true });
}
