'use client';

import { useState } from 'react';

export default function RsvpPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    attending_ceremony: true, attending_reception: true,
    guest_count: 1, dietary: '', message: '',
  });
  const [status, setStatus]   = useState<'idle'|'loading'|'success'|'error'>('idle');
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
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px', padding: '40px 24px' }}>
          <div style={{ fontSize: '5rem', marginBottom: '24px' }}>🎊</div>
          <h2 className="font-display" style={{ fontSize: '3.5rem', color: 'var(--green-dark)', marginBottom: '16px' }}>
            Thank you, {form.name}!
          </h2>
          <p className="font-serif" style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: '24px' }}>
            Your RSVP has been received. We can&apos;t wait to celebrate with you!
          </p>
          <p style={{ fontSize: '0.78rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>
            #ThushanWedsDharshi
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Header */}
      <div style={{ background: 'var(--green-dark)', padding: '120px 48px 60px', textAlign: 'center' }}>
        <p className="sec-label" style={{ color: 'var(--gold)' }}>You Are Invited</p>
        <h1 className="font-display" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'white', marginBottom: '12px' }}>RSVP</h1>
        <p className="font-serif" style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>
          Please let us know you&apos;re coming to celebrate with us.
        </p>
      </div>

      <div style={{ maxWidth: '620px', margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ background: 'white', border: '1px solid rgba(201,168,76,0.28)', padding: '48px 40px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <Field label="Full Name *">
              <input type="text" required placeholder="Your full name"
                value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field label="Email">
                <input type="email" placeholder="your@email.com"
                  value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </Field>
              <Field label="Phone">
                <input type="tel" placeholder="+44 000 000 0000"
                  value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </Field>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px', fontFamily: 'var(--font-lato)' }}>
                I will be attending
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { key: 'attending_ceremony', label: '🪔 Hindu Ceremony — Wednesday 1st July 2026' },
                  { key: 'attending_reception', label: '🥂 Reception Party — Friday 3rd July 2026' },
                ].map(({ key, label }) => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-mid)' }}>
                    <input
                      type="checkbox"
                      checked={form[key as 'attending_ceremony'|'attending_reception']}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.checked }))}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--gold)', flexShrink: 0, border: 'none !important', padding: '0 !important' }}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <Field label="Number of Guests (including yourself)">
              <select value={form.guest_count} onChange={e => setForm(f => ({ ...f, guest_count: Number(e.target.value) }))}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
              </select>
            </Field>

            <Field label="Dietary Requirements">
              <input type="text" placeholder="e.g. Vegetarian, Vegan, Nut allergy…"
                value={form.dietary} onChange={e => setForm(f => ({ ...f, dietary: e.target.value }))} />
            </Field>

            <Field label="Message for the Couple">
              <textarea rows={4} placeholder="Share your wishes for Thushan & Dharshi…"
                value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
            </Field>

            {status === 'error' && (
              <p style={{ fontSize: '0.85rem', color: '#c0392b', textAlign: 'center' }}>{errorMsg}</p>
            )}

            <button type="submit" disabled={status === 'loading'} className="btn-primary" style={{ textAlign: 'center', border: 'none', width: '100%', padding: '14px' }}>
              {status === 'loading' ? 'Sending…' : 'Confirm Attendance ✦'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'var(--font-lato)' }}>
        {label}
      </label>
      {children}
    </div>
  );
}
