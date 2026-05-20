'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password }),
      });
      if (res.ok) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
        setStatus('error');
      }
    } catch {
      setError('Connection error. Please try again.');
      setStatus('error');
    }
  }

  async function handleSetup(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'setup', email, password }),
      });
      if (res.ok) {
        await handleLogin(e);
      } else {
        const data = await res.json();
        setError(data.error || 'Setup failed');
        setStatus('error');
      }
    } catch {
      setError('Setup error.');
      setStatus('error');
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'linear-gradient(135deg, #0a0205, #1a0610, #0a0205)' }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="text-4xl mb-3" style={{ color: 'var(--gold)' }}>ॐ</div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--gold-light)', fontFamily: 'Georgia, serif' }}>
            Admin Portal
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255,248,231,0.5)' }}>Thushan & Dharshi Wedding</p>
        </div>

        <div className="wedding-card rounded-3xl p-8">
          <form className="space-y-5">
            <div>
              <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>
                Email
              </label>
              <input
                type="email"
                required
                placeholder="admin@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-center" style={{ color: '#FF6B6B' }}>{error}</p>
            )}

            <button
              type="submit"
              onClick={handleLogin}
              disabled={status === 'loading'}
              className="btn-gold w-full py-3 rounded-full text-sm tracking-widest uppercase"
            >
              {status === 'loading' ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="text-center">
              <span className="text-xs" style={{ color: 'rgba(255,248,231,0.4)' }}>First time? </span>
              <button
                type="button"
                onClick={handleSetup}
                disabled={status === 'loading'}
                className="text-xs underline"
                style={{ color: 'var(--gold)' }}
              >
                Create admin account
              </button>
            </div>
          </form>
        </div>

        <p className="text-center mt-6 text-xs" style={{ color: 'rgba(255,248,231,0.3)' }}>
          Protected area · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
