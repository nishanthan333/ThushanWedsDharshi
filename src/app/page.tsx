import WeddingSceneClient from '@/components/three/WeddingSceneClient';
import CountdownTimer from '@/components/sections/CountdownTimer';
import FlipCards from '@/components/sections/FlipCards';
import CeremonyCards from '@/components/sections/CeremonyCards';
import { getWeddingInfo, getFamilyMembers, FamilyMember } from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const info    = getWeddingInfo();
  const members = getFamilyMembers() as FamilyMember[];
  const groomFamily = members.filter(m => m.side === 'groom');
  const brideFamily = members.filter(m => m.side === 'bride');

  return (
    <div>

      {/* ══════════════════════════════════════════
          HERO — dark green + Three.js
      ══════════════════════════════════════════ */}
      <section id="hero" style={{
        minHeight: '100vh', position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(155deg, #0C2E1A 0%, #1A5C3A 50%, #25724A 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', padding: '100px 24px 80px',
      }}>
        {/* Three.js ambient particles */}
        <WeddingSceneClient />

        {/* Decorative rings */}
        <div style={{ position: 'absolute', width: '600px', height: '600px', top: '-200px', right: '-150px', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.1)', pointerEvents: 'none', boxShadow: '0 0 0 50px rgba(201,168,76,0.03), 0 0 0 100px rgba(201,168,76,0.015)' }} />
        <div style={{ position: 'absolute', width: '480px', height: '480px', bottom: '-160px', left: '-120px', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.1)', pointerEvents: 'none', boxShadow: '0 0 0 50px rgba(201,168,76,0.03), 0 0 0 100px rgba(201,168,76,0.015)' }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '700px' }}>
          {/* Ganesha SVG */}
          <div style={{ marginBottom: '6px', animation: 'float 4s ease-in-out infinite' }}>
            <svg width="90" height="108" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="45" r="39" stroke="#C9A84C" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.45"/>
              <ellipse cx="50" cy="90" rx="23" ry="22" fill="#C9A84C" opacity="0.1" stroke="#C9A84C" strokeWidth="1"/>
              <ellipse cx="50" cy="43" rx="23" ry="25" fill="#C9A84C" opacity="0.16" stroke="#C9A84C" strokeWidth="1.5"/>
              <ellipse cx="22" cy="39" rx="10" ry="13" fill="#C9A84C" opacity="0.12" stroke="#C9A84C" strokeWidth="1"/>
              <ellipse cx="78" cy="39" rx="10" ry="13" fill="#C9A84C" opacity="0.12" stroke="#C9A84C" strokeWidth="1"/>
              <circle cx="43" cy="37" r="2.5" fill="#C9A84C" opacity="0.85"/>
              <circle cx="57" cy="37" r="2.5" fill="#C9A84C" opacity="0.85"/>
              <circle cx="50" cy="29" r="1.8" fill="#C9A84C" opacity="0.9"/>
              <path d="M46 53 Q39 63 35 72 Q32 79 38 80 Q45 82 47 75" stroke="#C9A84C" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
              <path d="M31 21 L35 10 L42 17 L50 6 L58 17 L65 10 L69 21" stroke="#C9A84C" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
              <line x1="28" y1="74" x2="16" y2="88" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" opacity="0.55"/>
              <line x1="72" y1="74" x2="84" y2="88" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" opacity="0.55"/>
              <text x="50" y="95" textAnchor="middle" fontSize="13" fill="#C9A84C" opacity="0.65" fontFamily="serif">ॐ</text>
            </svg>
          </div>

          <p style={{ fontSize: '0.88rem', letterSpacing: '0.22em', color: 'rgba(201,168,76,0.75)', marginBottom: '36px', textTransform: 'uppercase', fontFamily: 'var(--font-cormorant)' }}>
            Sri Ganeshaya Namaha &nbsp;·&nbsp; ஸ்ரீ கணேசாய நமஹ
          </p>

          <h1 className="font-display" style={{ fontSize: 'clamp(3.8rem, 10vw, 7.5rem)', color: 'white', lineHeight: 1.05, textShadow: '0 2px 30px rgba(0,0,0,0.3)', marginBottom: '4px' }}>
            Thushan
            <span style={{ color: 'var(--gold)', display: 'block', fontSize: '0.6em', lineHeight: 0.85 }}>&amp;</span>
            Dharshi
          </h1>

          <div className="gold-line" />

          <p className="font-serif" style={{ fontSize: '1.05rem', letterSpacing: '0.28em', color: 'rgba(255,255,255,0.82)', textTransform: 'uppercase', marginBottom: '6px' }}>
            Wednesday · 1st July 2026
          </p>
          <p style={{ fontSize: '0.8rem', letterSpacing: '0.14em', color: 'rgba(201,168,76,0.65)', textTransform: 'uppercase', marginBottom: '52px' }}>
            🌿 Hindu Ceremony &nbsp;&amp;&nbsp; Reception 3rd July 2026
          </p>

          <CountdownTimer targetDate="2026-07-01T10:00:00" />

          <div style={{ marginTop: '48px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/rsvp" className="btn-gold" style={{ padding: '13px 38px' }}>
              RSVP Now
            </Link>
            <Link href="/events" className="btn-outline" style={{ padding: '13px 38px' }}>
              View Events
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: '28px', left: '50%', color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', animation: 'bobDown 2s ease-in-out infinite' }}>
          Scroll to explore ↓
        </div>

        <style>{`
          @keyframes bobDown {
            0%,100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(7px); }
          }
          @keyframes float {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
        `}</style>
      </section>


      {/* ══════════════════════════════════════════
          OUR STORY
      ══════════════════════════════════════════ */}
      <section id="story" className="sec">
        <p className="sec-label">The Beginning</p>
        <h2 className="sec-title">Our Story</h2>
        <p className="font-serif" style={{ fontSize: '1.08rem', fontStyle: 'italic', color: 'var(--text-mid)', textAlign: 'center', marginBottom: '48px' }}>
          Two families, one beautiful beginning
        </p>
        <div className="ornament">
          <span className="orn-line" /><span className="orn-dot" /><span className="orn-line orn-line-r" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '56px', alignItems: 'center' }}>
          {/* Photo frame */}
          <div style={{
            aspectRatio: '3/4', background: 'var(--green-light)',
            border: '2px solid var(--gold)', position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: '10px', border: '1px solid rgba(201,168,76,0.35)', pointerEvents: 'none' }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', color: 'var(--green-mid)' }}>
              <span style={{ fontSize: '3rem', opacity: 0.3 }}>📷</span>
              <p style={{ fontSize: '0.75rem', opacity: 0.45, letterSpacing: '0.08em' }}>Photo coming soon</p>
            </div>
          </div>

          {/* Story text + flip cards */}
          <div>
            <h3 className="font-serif" style={{ fontSize: '1.9rem', color: 'var(--green-dark)', marginBottom: '18px', fontWeight: 400 }}>
              How We Found Each Other
            </h3>
            <p style={{ fontSize: '0.93rem', lineHeight: 1.82, color: 'var(--text-mid)', marginBottom: '16px' }}>
              {info.welcome_message}
            </p>
            <p style={{ fontSize: '0.93rem', lineHeight: 1.82, color: 'var(--text-mid)', marginBottom: '16px' }}>
              With the blessings of their families and Lord Ganesha watching over them, Thushan and Dharshi are now ready to walk the seven sacred steps together and begin the greatest adventure of their lives.
            </p>
            <div className="gold-line" style={{ marginLeft: 0, marginTop: '22px' }} />
            <blockquote style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.08rem', fontStyle: 'italic', color: 'var(--green-dark)', borderLeft: '2px solid var(--gold)', paddingLeft: '16px', margin: '20px 0' }}>
              &ldquo;In this life and all the ones that follow, it will always be you.&rdquo;
            </blockquote>
            <FlipCards />
          </div>
        </div>

        <style>{`
          @media (max-width: 800px) {
            #story-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>


      {/* ══════════════════════════════════════════
          FAMILIES — green-light bg
      ══════════════════════════════════════════ */}
      <div style={{ background: 'var(--green-light)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '90px 48px' }}>
          <p className="sec-label">With Joy &amp; Pride</p>
          <h2 className="sec-title">Our Families</h2>
          <p className="font-serif" style={{ fontSize: '1.08rem', fontStyle: 'italic', color: 'var(--text-mid)', textAlign: 'center', marginBottom: '48px' }}>
            Two families becoming one
          </p>
          <div className="ornament">
            <span className="orn-line" /><span className="orn-dot" /><span className="orn-line orn-line-r" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <FamilyCard title="Groom's Family" side="groom" members={groomFamily} />
            <FamilyCard title="Bride's Family"  side="bride"  members={brideFamily} />
          </div>
        </div>
      </div>


      {/* ══════════════════════════════════════════
          CEREMONIES
      ══════════════════════════════════════════ */}
      <section id="ceremonies" className="sec">
        <p className="sec-label">Understanding Our Traditions</p>
        <h2 className="sec-title">Hindu Ceremonies</h2>
        <p className="font-serif" style={{ fontSize: '1.08rem', fontStyle: 'italic', color: 'var(--text-mid)', textAlign: 'center', marginBottom: '48px' }}>
          Each ritual carries centuries of meaning and love
        </p>
        <div className="ornament">
          <span className="orn-line" /><span className="orn-dot" /><span className="orn-line orn-line-r" />
        </div>
        <CeremonyCards />
      </section>


      {/* ══════════════════════════════════════════
          EVENTS TIMELINE — dark green bg
      ══════════════════════════════════════════ */}
      <div id="events" style={{ background: 'var(--green-dark)', padding: '90px 48px' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <p className="sec-label" style={{ color: 'var(--gold)' }}>Save the Dates</p>
          <h2 className="sec-title" style={{ color: 'white' }}>Wedding Events</h2>
          <p className="font-serif" style={{ fontSize: '1.08rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: '48px' }}>
            Two days of ceremony, celebration and lifelong memories
          </p>
          <div className="ornament">
            <span className="orn-line" style={{ background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.5))' }} />
            <span className="orn-dot" />
            <span className="orn-line orn-line-r" style={{ background: 'linear-gradient(90deg,rgba(201,168,76,0.5),transparent)' }} />
          </div>

          <div style={{ position: 'relative', maxWidth: '680px', margin: '0 auto' }}>
            <div style={{ position: 'absolute', left: '108px', top: '8px', bottom: 0, width: '1px', background: 'rgba(201,168,76,0.22)' }} />
            {timeline.map((ev) => (
              <div key={ev.day} style={{ display: 'flex', gap: '28px', marginBottom: '48px', alignItems: 'flex-start' }}>
                <div style={{ width: '92px', textAlign: 'right', flexShrink: 0 }}>
                  <div className="font-serif" style={{ fontSize: '2.1rem', color: 'var(--gold)', lineHeight: 1 }}>{ev.day}</div>
                  <div style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>{ev.month}</div>
                </div>
                <div style={{ width: '11px', height: '11px', background: 'var(--gold)', borderRadius: '50%', flexShrink: 0, marginTop: '7px', position: 'relative', zIndex: 1 }} />
                <div style={{ flex: 1 }}>
                  <h4 className="font-serif" style={{ fontSize: '1.25rem', color: 'white', marginBottom: '4px', fontWeight: 400 }}>{ev.title}</h4>
                  <div style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: 'var(--gold)', marginBottom: '5px' }}>{ev.time}</div>
                  <p style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Link href="/events" className="btn-outline" style={{ padding: '13px 38px' }}>
              Full Event Details →
            </Link>
          </div>
        </div>
      </div>


      {/* ══════════════════════════════════════════
          GALLERY PREVIEW
      ══════════════════════════════════════════ */}
      <section className="sec">
        <p className="sec-label">Memories Together</p>
        <h2 className="sec-title">Photo Album</h2>
        <p className="font-serif" style={{ fontSize: '1.08rem', fontStyle: 'italic', color: 'var(--text-mid)', textAlign: 'center', marginBottom: '48px' }}>
          Moments we cherish — and ones still to come
        </p>
        <div className="ornament">
          <span className="orn-line" /><span className="orn-dot" /><span className="orn-line orn-line-r" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px', marginBottom: '32px' }}>
          {['🌸','🌿','🪔','💍','👨‍👩‍👧‍👦','🎊','✨','🌺'].map((emoji, i) => (
            <div key={i} style={{ aspectRatio: '4/3', background: 'var(--green-light)', border: '1px solid rgba(201,168,76,0.18)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span style={{ fontSize: '2.5rem', opacity: 0.35 }}>{emoji}</span>
              <span style={{ fontSize: '0.7rem', opacity: 0.45, letterSpacing: '0.1em', color: 'var(--green-mid)' }}>Coming soon</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/gallery" className="btn-primary">View Gallery →</Link>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          RSVP CTA — dark green
      ══════════════════════════════════════════ */}
      <div style={{ background: 'var(--green-dark)', padding: '90px 48px', textAlign: 'center' }}>
        <p className="sec-label" style={{ color: 'var(--gold)' }}>You Are Invited</p>
        <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'white', marginBottom: '18px' }}>
          Join Us
        </h2>
        <p className="font-serif" style={{ fontSize: '1.08rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', maxWidth: '500px', margin: '0 auto 40px', lineHeight: 1.7 }}>
          Your presence will make our celebration complete. Please let us know you&apos;re coming.
        </p>
        <Link href="/rsvp" className="btn-gold" style={{ padding: '14px 48px', fontSize: '0.82rem' }}>
          RSVP Now
        </Link>
        {info.rsvp_deadline && (
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.3)', marginTop: '20px' }}>
            Kindly respond by {new Date(info.rsvp_deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        )}
      </div>

    </div>
  );
}

function FamilyCard({ title, side, members }: { title: string; side: string; members: FamilyMember[] }) {
  const isGroom = side === 'groom';
  const couple  = members.find(m => m.relation.toLowerCase().includes(isGroom ? 'groom' : 'bride'));
  const rest    = members.filter(m => m !== couple);

  return (
    <div style={{
      background: 'white', border: '1px solid rgba(201,168,76,0.3)', padding: '40px 34px',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: '8px', left: '8px', right: '-8px', bottom: '-8px', border: '1px solid rgba(201,168,76,0.12)', zIndex: -1 }} />
      <p style={{ fontSize: '0.63rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--silver)', marginBottom: '8px', fontFamily: 'var(--font-lato)' }}>
        {title}
      </p>
      <h3 className="font-serif" style={{ fontSize: '1.85rem', color: 'var(--green-dark)', marginBottom: '6px', fontWeight: 400 }}>
        {isGroom ? 'Thushan\'s Family' : 'Dharshi\'s Family'}
      </h3>
      <p style={{ fontSize: '0.78rem', color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '18px' }}>
        🌿 Together with love and blessings
      </p>
      <div style={{ fontSize: '0.88rem', color: 'var(--text-mid)', lineHeight: 1.78 }}>
        {rest.length > 0 ? (
          rest.map(m => (
            <div key={m.id}>
              <strong>{m.relation}:</strong> {m.name}
              {m.description && <span style={{ opacity: 0.65 }}> — {m.description}</span>}
            </div>
          ))
        ) : (
          <p style={{ opacity: 0.5, fontStyle: 'italic' }}>Family details coming soon — check back shortly!</p>
        )}
      </div>
    </div>
  );
}

const timeline = [
  {
    day: '01', month: 'July',
    title: 'Hindu Ceremony — Thirumanam',
    time: 'Muhurtham · 10:00 AM · Ceremony Venue',
    desc: 'The main ceremony: Ganesh Pooja, Nalangu, Kashi Yathra, Kanyadanam, Muhurtham and Sapthapadi. All invited guests warmly welcome.',
  },
  {
    day: '03', month: 'July',
    title: 'Reception Night',
    time: '6:00 PM · Reception Venue',
    desc: 'An elegant evening to celebrate the newly wed couple — dinner, music, dancing and blessings that last all night. Dress: formal or semi-formal.',
  },
];
