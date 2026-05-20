import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { getWeddingInfo, getRsvps, getGallery, getFamilyMembers } from '@/lib/db';
import AdminDashboardClient from '@/components/admin/AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  const info = getWeddingInfo();
  const rsvps = getRsvps();
  const gallery = getGallery();
  const familyMembers = getFamilyMembers();

  return (
    <AdminDashboardClient
      initialInfo={info}
      rsvps={rsvps}
      gallery={gallery}
      familyMembers={familyMembers}
      adminEmail={session.email}
    />
  );
}
