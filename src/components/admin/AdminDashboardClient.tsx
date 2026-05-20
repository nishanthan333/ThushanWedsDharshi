'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { WeddingInfo, RsvpEntry, GalleryItem, FamilyMember } from '@/lib/db';

type Tab = 'overview' | 'wedding-info' | 'rsvps' | 'gallery' | 'family';

interface Props {
  initialInfo: WeddingInfo;
  rsvps: unknown[];
  gallery: unknown[];
  familyMembers: unknown[];
  adminEmail: string;
}

export default function AdminDashboardClient({ initialInfo, rsvps, gallery, familyMembers, adminEmail }: Props) {
  const [tab, setTab] = useState<Tab>('overview');
  const [info, setInfo] = useState<WeddingInfo>(initialInfo);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const router = useRouter();

  async function saveInfo() {
    setSaving(true);
    setSaveMsg('');
    try {
      const res = await fetch('/api/wedding-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info),
      });
      if (res.ok) {
        setSaveMsg('Saved successfully!');
        router.refresh();
      } else {
        setSaveMsg('Error saving. Please try again.');
      }
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMsg(''), 3000);
    }
  }

  async function logout() {
    await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'logout' }) });
    router.push('/admin/login');
  }

  const rsvpList = rsvps as RsvpEntry[];
  const galleryList = gallery as GalleryItem[];
  const familyList = familyMembers as FamilyMember[];

  const totalGuests = rsvpList.reduce((sum, r) => sum + r.guest_count, 0);
  const ceremonyCount = rsvpList.filter(r => r.attending_ceremony).length;
  const receptionCount = rsvpList.filter(r => r.attending_reception).length;

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'wedding-info', label: 'Wedding Info', icon: '💍' },
    { id: 'rsvps', label: `RSVPs (${rsvpList.length})`, icon: '✉️' },
    { id: 'gallery', label: 'Gallery', icon: '🖼️' },
    { id: 'family', label: 'Family Tree', icon: '👨‍👩‍👧' },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: '#0a0205' }}>
      {/* Sidebar */}
      <aside className="admin-sidebar w-64 min-h-screen flex flex-col p-6 fixed left-0 top-0 bottom-0">
        <div className="mb-8">
          <div className="text-2xl mb-1 text-center" style={{ color: 'var(--gold)' }}>ॐ</div>
          <h1 className="text-lg font-bold text-center" style={{ color: 'var(--gold-light)', fontFamily: 'Georgia, serif' }}>
            Admin Portal
          </h1>
          <p className="text-xs text-center mt-1" style={{ color: 'rgba(255,248,231,0.4)' }}>{adminEmail}</p>
        </div>

        <nav className="flex-1 space-y-1">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200"
              style={{
                background: tab === t.id ? 'rgba(212,160,23,0.15)' : 'transparent',
                color: tab === t.id ? 'var(--gold-light)' : 'rgba(255,248,231,0.6)',
                border: tab === t.id ? '1px solid rgba(212,160,23,0.3)' : '1px solid transparent',
              }}
            >
              <span className="mr-3">{t.icon}</span>{t.label}
            </button>
          ))}
        </nav>

        <div className="mt-6 space-y-3">
          <a
            href="/"
            target="_blank"
            className="block w-full text-center px-4 py-2 rounded-xl text-sm btn-outline-gold"
          >
            View Site →
          </a>
          <button
            onClick={logout}
            className="w-full text-center px-4 py-2 rounded-xl text-sm"
            style={{ color: 'rgba(255,248,231,0.4)', border: '1px solid rgba(255,248,231,0.1)' }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8">
        {tab === 'overview' && (
          <OverviewTab
            totalRsvps={rsvpList.length}
            totalGuests={totalGuests}
            ceremonyCount={ceremonyCount}
            receptionCount={receptionCount}
            galleryCount={galleryList.length}
            familyCount={familyList.length}
            info={info}
          />
        )}

        {tab === 'wedding-info' && (
          <WeddingInfoTab info={info} setInfo={setInfo} onSave={saveInfo} saving={saving} saveMsg={saveMsg} />
        )}

        {tab === 'rsvps' && <RsvpsTab rsvps={rsvpList} />}

        {tab === 'gallery' && <GalleryTab gallery={galleryList} />}

        {tab === 'family' && <FamilyTab members={familyList} />}
      </main>
    </div>
  );
}

function StatCard({ label, value, icon, sub }: { label: string; value: string | number; icon: string; sub?: string }) {
  return (
    <div className="wedding-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <span className="text-3xl font-bold" style={{ color: 'var(--gold-light)' }}>{value}</span>
      </div>
      <p className="text-sm font-medium" style={{ color: 'rgba(255,248,231,0.8)' }}>{label}</p>
      {sub && <p className="text-xs mt-1" style={{ color: 'rgba(255,248,231,0.4)' }}>{sub}</p>}
    </div>
  );
}

function OverviewTab({ totalRsvps, totalGuests, ceremonyCount, receptionCount, galleryCount, familyCount, info }: {
  totalRsvps: number; totalGuests: number; ceremonyCount: number; receptionCount: number;
  galleryCount: number; familyCount: number; info: WeddingInfo;
}) {
  const ceremony = new Date(info.ceremony_date);
  const daysLeft = Math.ceil((ceremony.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--cream)', fontFamily: 'Georgia, serif' }}>
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <StatCard label="Days Until Ceremony" value={Math.max(0, daysLeft)} icon="📅" sub="1st July 2026" />
        <StatCard label="RSVPs Received" value={totalRsvps} icon="✉️" />
        <StatCard label="Total Guests" value={totalGuests} icon="👥" />
        <StatCard label="Ceremony Guests" value={ceremonyCount} icon="🪔" />
        <StatCard label="Reception Guests" value={receptionCount} icon="✨" />
        <StatCard label="Gallery Items" value={galleryCount} icon="🖼️" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="wedding-card rounded-2xl p-6">
          <h3 className="font-bold mb-4" style={{ color: 'var(--gold)' }}>Wedding Details</h3>
          <div className="space-y-2 text-sm" style={{ color: 'rgba(255,248,231,0.7)' }}>
            <p>📅 Ceremony: {info.ceremony_date} at {info.ceremony_time}</p>
            <p>📍 {info.ceremony_venue}</p>
            <p className="mt-3">📅 Reception: {info.reception_date} at {info.reception_time}</p>
            <p>📍 {info.reception_venue}</p>
            <p className="mt-3">⏰ RSVP Deadline: {info.rsvp_deadline}</p>
          </div>
        </div>
        <div className="wedding-card rounded-2xl p-6">
          <h3 className="font-bold mb-4" style={{ color: 'var(--gold)' }}>Quick Actions</h3>
          <div className="space-y-3">
            {[
              { label: 'Update Wedding Info', tab: 'wedding-info' },
              { label: 'View All RSVPs', tab: 'rsvps' },
              { label: 'Manage Gallery', tab: 'gallery' },
              { label: 'Edit Family Tree', tab: 'family' },
            ].map(({ label }) => (
              <div key={label} className="text-sm py-2 px-3 rounded-lg" style={{ background: 'rgba(212,160,23,0.05)', color: 'rgba(255,248,231,0.7)' }}>
                → {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>{label}</label>
      {children}
    </div>
  );
}

function WeddingInfoTab({ info, setInfo, onSave, saving, saveMsg }: {
  info: WeddingInfo;
  setInfo: (i: WeddingInfo) => void;
  onSave: () => void;
  saving: boolean;
  saveMsg: string;
}) {
  function update(key: keyof WeddingInfo, value: string) {
    setInfo({ ...info, [key]: value });
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--cream)', fontFamily: 'Georgia, serif' }}>
        Wedding Information
      </h2>

      <div className="space-y-8">
        <Section title="General">
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Couple Names">
              <input value={info.couple_names} onChange={e => update('couple_names', e.target.value)} />
            </Field>
            <Field label="Hashtag">
              <input value={info.hashtag} onChange={e => update('hashtag', e.target.value)} />
            </Field>
          </div>
          <Field label="Welcome Message">
            <textarea rows={3} value={info.welcome_message} onChange={e => update('welcome_message', e.target.value)} />
          </Field>
          <Field label="RSVP Deadline">
            <input type="date" value={info.rsvp_deadline} onChange={e => update('rsvp_deadline', e.target.value)} />
          </Field>
        </Section>

        <Section title="🪔 Hindu Ceremony — 1st July 2026">
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Time">
              <input value={info.ceremony_time} onChange={e => update('ceremony_time', e.target.value)} />
            </Field>
            <Field label="Venue Name">
              <input value={info.ceremony_venue} onChange={e => update('ceremony_venue', e.target.value)} />
            </Field>
          </div>
          <Field label="Venue Address">
            <input value={info.ceremony_address} onChange={e => update('ceremony_address', e.target.value)} />
          </Field>
        </Section>

        <Section title="✨ Reception Party — 3rd July 2026">
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Time">
              <input value={info.reception_time} onChange={e => update('reception_time', e.target.value)} />
            </Field>
            <Field label="Venue Name">
              <input value={info.reception_venue} onChange={e => update('reception_venue', e.target.value)} />
            </Field>
          </div>
          <Field label="Venue Address">
            <input value={info.reception_address} onChange={e => update('reception_address', e.target.value)} />
          </Field>
        </Section>

        <div className="flex items-center gap-4">
          <button
            onClick={onSave}
            disabled={saving}
            className="btn-gold px-10 py-3 rounded-full text-sm tracking-widest uppercase"
          >
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
          {saveMsg && (
            <span className="text-sm" style={{ color: saveMsg.includes('Error') ? '#FF6B6B' : '#4CAF50' }}>
              {saveMsg}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="wedding-card rounded-2xl p-6 space-y-4">
      <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--gold-light)' }}>{title}</h3>
      {children}
    </div>
  );
}

function RsvpsTab({ rsvps }: { rsvps: RsvpEntry[] }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--cream)', fontFamily: 'Georgia, serif' }}>
        RSVPs ({rsvps.length})
      </h2>

      {rsvps.length === 0 ? (
        <div className="wedding-card rounded-2xl p-12 text-center">
          <div className="text-4xl mb-4">✉️</div>
          <p style={{ color: 'rgba(255,248,231,0.5)' }}>No RSVPs received yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {rsvps.map(r => (
            <div key={r.id} className="wedding-card rounded-xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-bold text-lg" style={{ color: 'var(--cream)' }}>{r.name}</p>
                  <p className="text-sm" style={{ color: 'rgba(255,248,231,0.5)' }}>
                    {r.email} {r.phone && `· ${r.phone}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm" style={{ color: 'var(--gold)' }}>{r.guest_count} guest{r.guest_count !== 1 ? 's' : ''}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,248,231,0.4)' }}>{new Date(r.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex gap-3 mt-3 flex-wrap">
                {r.attending_ceremony ? (
                  <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(212,160,23,0.15)', color: 'var(--gold)' }}>🪔 Ceremony</span>
                ) : (
                  <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,248,231,0.3)' }}>No Ceremony</span>
                )}
                {r.attending_reception ? (
                  <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(155,27,48,0.2)', color: 'var(--rose)' }}>✨ Reception</span>
                ) : (
                  <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,248,231,0.3)' }}>No Reception</span>
                )}
                {r.dietary && <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(76,175,80,0.1)', color: '#4CAF50' }}>🥗 {r.dietary}</span>}
              </div>
              {r.message && (
                <p className="text-sm mt-3 italic" style={{ color: 'rgba(255,248,231,0.6)' }}>&ldquo;{r.message}&rdquo;</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function GalleryTab({ gallery }: { gallery: GalleryItem[] }) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [adding, setAdding] = useState(false);
  const [msg, setMsg] = useState('');

  async function add() {
    if (!url.trim()) return;
    setAdding(true);
    await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, title, description: desc }),
    });
    setUrl(''); setTitle(''); setDesc('');
    setMsg('Added! Refresh to see it.');
    setAdding(false);
    setTimeout(() => setMsg(''), 3000);
  }

  async function remove(id: number) {
    await fetch('/api/gallery', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setMsg('Deleted! Refresh to update.');
    setTimeout(() => setMsg(''), 3000);
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--cream)', fontFamily: 'Georgia, serif' }}>
        Gallery Management
      </h2>

      <div className="wedding-card rounded-2xl p-6 mb-8">
        <h3 className="font-bold mb-4" style={{ color: 'var(--gold)' }}>Add Photo</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>Image URL *</label>
            <input placeholder="https://..." value={url} onChange={e => setUrl(e.target.value)} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>Title</label>
              <input placeholder="Caption..." value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>Description</label>
              <input placeholder="Description..." value={desc} onChange={e => setDesc(e.target.value)} />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={add} disabled={adding} className="btn-gold px-8 py-2 rounded-full text-sm tracking-widest uppercase">
              {adding ? 'Adding...' : 'Add Photo'}
            </button>
            {msg && <span className="text-sm" style={{ color: '#4CAF50' }}>{msg}</span>}
          </div>
        </div>
      </div>

      {gallery.length === 0 ? (
        <div className="wedding-card rounded-2xl p-12 text-center">
          <div className="text-4xl mb-4">🖼️</div>
          <p style={{ color: 'rgba(255,248,231,0.5)' }}>No gallery items yet. Add your first photo above.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {gallery.map(item => (
            <div key={item.id} className="wedding-card rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.url} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                {item.title && <p className="font-bold text-sm mb-1" style={{ color: 'var(--gold-light)' }}>{item.title}</p>}
                {item.description && <p className="text-xs mb-3" style={{ color: 'rgba(255,248,231,0.5)' }}>{item.description}</p>}
                <button
                  onClick={() => remove(item.id)}
                  className="text-xs px-3 py-1 rounded-full"
                  style={{ background: 'rgba(155,27,48,0.2)', color: '#FF6B6B', border: '1px solid rgba(155,27,48,0.3)' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FamilyTab({ members }: { members: FamilyMember[] }) {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [side, setSide] = useState<'groom' | 'bride'>('groom');
  const [description, setDescription] = useState('');
  const [msg, setMsg] = useState('');

  async function add() {
    if (!name.trim() || !relation.trim()) return;
    await fetch('/api/family', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, relation, side, description, sort_order: members.length }),
    });
    setName(''); setRelation(''); setDescription('');
    setMsg('Added! Refresh to see it.');
    setTimeout(() => setMsg(''), 3000);
  }

  async function remove(id: number) {
    await fetch('/api/family', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setMsg('Deleted! Refresh to update.');
    setTimeout(() => setMsg(''), 3000);
  }

  const groomFamily = members.filter(m => m.side === 'groom');
  const brideFamily = members.filter(m => m.side === 'bride');

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--cream)', fontFamily: 'Georgia, serif' }}>
        Family Tree
      </h2>

      <div className="wedding-card rounded-2xl p-6 mb-8">
        <h3 className="font-bold mb-4" style={{ color: 'var(--gold)' }}>Add Family Member</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>Name *</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>Relation *</label>
            <input value={relation} onChange={e => setRelation(e.target.value)} placeholder="e.g. Father of Groom" />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>Side</label>
            <select value={side} onChange={e => setSide(e.target.value as 'groom' | 'bride')}>
              <option value="groom">Groom&apos;s Side</option>
              <option value="bride">Bride&apos;s Side</option>
            </select>
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>Description</label>
            <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Optional note" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={add} className="btn-gold px-8 py-2 rounded-full text-sm tracking-widest uppercase">
            Add Member
          </button>
          {msg && <span className="text-sm" style={{ color: '#4CAF50' }}>{msg}</span>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <FamilyList title="Groom's Family" members={groomFamily} onDelete={remove} />
        <FamilyList title="Bride's Family" members={brideFamily} onDelete={remove} />
      </div>
    </div>
  );
}

function FamilyList({ title, members, onDelete }: { title: string; members: FamilyMember[]; onDelete: (id: number) => void }) {
  return (
    <div>
      <h3 className="font-bold mb-4" style={{ color: 'var(--gold-light)' }}>{title}</h3>
      <div className="space-y-3">
        {members.map(m => (
          <div key={m.id} className="wedding-card rounded-xl p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-sm" style={{ color: 'var(--cream)' }}>{m.name}</p>
              <p className="text-xs" style={{ color: 'var(--gold)' }}>{m.relation}</p>
              {m.description && <p className="text-xs" style={{ color: 'rgba(255,248,231,0.4)' }}>{m.description}</p>}
            </div>
            <button
              onClick={() => onDelete(m.id)}
              className="text-xs px-3 py-1 rounded-full flex-shrink-0"
              style={{ background: 'rgba(155,27,48,0.2)', color: '#FF6B6B', border: '1px solid rgba(155,27,48,0.3)' }}
            >
              Remove
            </button>
          </div>
        ))}
        {members.length === 0 && (
          <p className="text-sm italic" style={{ color: 'rgba(255,248,231,0.4)' }}>No members yet.</p>
        )}
      </div>
    </div>
  );
}
