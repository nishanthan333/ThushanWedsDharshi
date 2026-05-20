'use client';

import { useState } from 'react';

export default function RsvpPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    attending_ceremony: true, attending_reception: true,
    guest_count: 1, dietary: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setStatus('success');
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen section-dark pt-32 pb-24 px-6 flex items-center justify-center">
        <div className="text-center max-w-xl">
          <div className="text-7xl mb-6">🎊</div>
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--gold-light)', fontFamily: 'Georgia, serif' }}>
            Thank You, {form.name}!
          </h2>
          <p className="text-lg italic mb-8" style={{ color: 'rgba(255,248,231,0.7)', fontFamily: 'Georgia, serif' }}>
            Your RSVP has been received. We can&apos;t wait to celebrate with you!
          </p>
          <p className="text-sm tracking-widest" style={{ color: 'var(--gold)' }}>#ThushanWedsDharshi</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-dark pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--gold)' }}>✦ You Are Invited ✦</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: 'var(--cream)', fontFamily: 'Georgia, serif' }}>
            RSVP
          </h1>
          <p className="italic" style={{ color: 'rgba(255,248,231,0.6)' }}>
            Please let us know you&apos;re coming to celebrate with us.
          </p>
        </div>

        <div className="wedding-card rounded-3xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Your full name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+44 000 000 0000"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>
                Attending
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.attending_ceremony}
                    onChange={e => setForm(f => ({ ...f, attending_ceremony: e.target.checked }))}
                    className="w-4 h-4"
                    style={{ width: 'auto', border: 'none' }}
                  />
                  <span style={{ color: 'rgba(255,248,231,0.8)' }}>🪔 Hindu Ceremony — Wednesday 1st July 2026</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.attending_reception}
                    onChange={e => setForm(f => ({ ...f, attending_reception: e.target.checked }))}
                    className="w-4 h-4"
                    style={{ width: 'auto', border: 'none' }}
                  />
                  <span style={{ color: 'rgba(255,248,231,0.8)' }}>✨ Reception Party — Friday 3rd July 2026</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>
                Number of Guests (including yourself)
              </label>
              <select
                value={form.guest_count}
                onChange={e => setForm(f => ({ ...f, guest_count: Number(e.target.value) }))}
              >
                {[1,2,3,4,5].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>
                Dietary Requirements
              </label>
              <input
                type="text"
                placeholder="e.g. Vegetarian, Vegan, Nut allergy..."
                value={form.dietary}
                onChange={e => setForm(f => ({ ...f, dietary: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>
                Message for the Couple
              </label>
              <textarea
                rows={4}
                placeholder="Share your wishes for Thushan & Dharshi..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-center" style={{ color: '#FF6B6B' }}>{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-gold w-full py-4 rounded-full text-sm tracking-widest uppercase"
            >
              {status === 'loading' ? 'Sending...' : 'Confirm Attendance ✦'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
