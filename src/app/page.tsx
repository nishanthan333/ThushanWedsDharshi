import Link from 'next/link';
import CountdownTimer from '@/components/sections/CountdownTimer';
import WeddingSceneClient from '@/components/three/WeddingSceneClient';
import { getWeddingInfo } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const info = getWeddingInfo();

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <WeddingSceneClient />

        {/* Deep vignette so text pops over the 3D scene */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 85% 65% at 50% 50%, transparent 0%, rgba(2,13,6,0.55) 65%, rgba(2,13,6,0.97) 100%)',
          }}
        />

        <div className="relative z-10 text-center px-6 py-24 max-w-5xl mx-auto">
          {/* Om glyph */}
          <p className="text-5xl mb-2" style={{ color: 'var(--gold)', textShadow: '0 0 35px rgba(212,160,23,0.9)' }}>
            ॐ
          </p>
          <p className="text-xs tracking-[0.4em] uppercase mb-6" style={{ color: 'var(--silver)' }}>
            Together with their families
          </p>

          {/* Thushan — gold shimmer */}
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4"
            style={{
              fontFamily: 'Georgia, serif',
              background: 'linear-gradient(135deg, #8B6508, #D4A017, #FFD700, #fffbe0, #FFD700, #D4A017, #8B6508)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% auto',
            }}
          >
            Thushan
          </h1>

          {/* Divider row */}
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="h-px flex-1 max-w-32" style={{ background: 'linear-gradient(90deg, transparent, var(--gold))' }} />
            <span className="text-3xl" style={{ color: 'var(--gold)' }}>✦</span>
            <p className="text-xl md:text-2xl italic tracking-widest" style={{ color: 'var(--silver-light)', fontFamily: 'Georgia, serif' }}>
              weds
            </p>
            <span className="text-3xl" style={{ color: 'var(--gold)' }}>✦</span>
            <div className="h-px flex-1 max-w-32" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
          </div>

          {/* Dharshi — silver shimmer */}
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-10"
            style={{
              fontFamily: 'Georgia, serif',
              background: 'linear-gradient(135deg, #7A7A7A, #C8C8C8, #E8E8E8, #ffffff, #E8E8E8, #C8C8C8, #7A7A7A)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% auto',
            }}
          >
            Dharshi
          </h1>

          <div className="mb-10">
            <p className="text-sm tracking-[0.3em] uppercase mb-1" style={{ color: 'var(--silver)' }}>
              Hindu Ceremony · 1st July 2026
            </p>
            <p className="text-sm tracking-[0.3em] uppercase" style={{ color: 'var(--silver)' }}>
              Reception · 3rd July 2026
            </p>
          </div>

          <CountdownTimer targetDate="2026-07-01T10:00:00" />

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rsvp" className="btn-gold px-10 py-3 rounded-full text-sm tracking-widest uppercase">
              RSVP Now
            </Link>
            <Link href="/events" className="btn-outline-silver px-10 py-3 rounded-full text-sm tracking-widest uppercase">
              View Events
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-xs tracking-widest" style={{ color: 'rgba(212,160,23,0.45)' }}>SCROLL</span>
          <div className="w-px h-12" style={{ background: 'linear-gradient(180deg, var(--gold), transparent)' }} />
        </div>
      </section>

      {/* ── WELCOME ── */}
      <section className="section-medium py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="ornament-divider mb-10">
            <span className="text-sm tracking-widest" style={{ color: 'var(--gold)' }}>✦ शुभ विवाह ✦</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-8" style={{ color: 'var(--cream)', fontFamily: 'Georgia, serif' }}>
            A Sacred Union
          </h2>
          <p className="text-lg leading-relaxed mb-8" style={{ color: 'rgba(240,247,242,0.72)', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            {info.welcome_message}
          </p>
          <p className="text-sm tracking-widest" style={{ color: 'var(--gold)' }}>{info.hashtag}</p>
          <div className="ornament-divider mt-10">
            <span className="text-lg" style={{ color: 'var(--gold)' }}>✦</span>
          </div>
        </div>
      </section>

      {/* ── EVENTS PREVIEW ── */}
      <section className="section-dark py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--gold)' }}>Our Celebrations</p>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: 'var(--cream)', fontFamily: 'Georgia, serif' }}>
              Save the Dates
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <EventCard
              icon="🪔"
              title="Hindu Ceremony"
              date="Wednesday, 1st July 2026"
              time={info.ceremony_time}
              venue={info.ceremony_venue}
              address={info.ceremony_address}
              description="A sacred Hindu ceremony uniting two souls, blessed by ancient Vedic traditions and surrounded by family."
              accent="gold"
            />
            <EventCard
              icon="✨"
              title="Reception Party"
              date="Friday, 3rd July 2026"
              time={info.reception_time}
              venue={info.reception_venue}
              address={info.reception_address}
              description="An elegant evening of celebration — music, dancing, feasting, and memories that will last a lifetime."
              accent="silver"
            />
          </div>
          <div className="text-center mt-12">
            <Link href="/events" className="btn-outline-gold px-8 py-3 rounded-full text-sm tracking-widest uppercase">
              Full Event Details →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRADITIONS ── */}
      <section className="section-medium py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--gold)' }}>Our Heritage</p>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: 'var(--cream)', fontFamily: 'Georgia, serif' }}>
              Hindu Wedding Traditions
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {traditions.map((t, i) => (
              <div key={t.name} className="wedding-card rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300"
                style={{ borderColor: i % 2 === 0 ? 'rgba(212,160,23,0.22)' : 'rgba(200,200,200,0.15)' }}>
                <div className="text-4xl mb-4">{t.icon}</div>
                <h3 className="text-xl font-bold mb-3" style={{
                  color: i % 2 === 0 ? 'var(--gold-light)' : 'var(--silver-light)',
                  fontFamily: 'Georgia, serif',
                }}>
                  {t.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,247,242,0.68)' }}>
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY TEASER ── */}
      <section className="section-dark py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--gold)' }}>Memories</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--cream)', fontFamily: 'Georgia, serif' }}>
            Our Journey
          </h2>
          <p className="text-lg mb-10 italic" style={{ color: 'rgba(240,247,242,0.55)', fontFamily: 'Georgia, serif' }}>
            Images coming soon — we can&apos;t wait to share our story with you.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {['🪔','🌿','✨','🍃','💫','🌺','🎊','💚'].map((emoji, i) => (
              <div key={i} className="aspect-square rounded-xl wedding-card flex items-center justify-center"
                style={{ borderColor: i % 2 === 0 ? 'rgba(212,160,23,0.18)' : 'rgba(200,200,200,0.12)' }}>
                <span className="text-2xl opacity-30">{emoji}</span>
              </div>
            ))}
          </div>
          <Link href="/gallery" className="btn-outline-silver px-8 py-3 rounded-full text-sm tracking-widest uppercase">
            View Gallery →
          </Link>
        </div>
      </section>

      {/* ── RSVP CTA ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(46,125,82,0.18) 0%, rgba(2,13,6,0.92) 70%)' }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-6" style={{ color: 'var(--gold)', textShadow: '0 0 30px rgba(212,160,23,0.7)' }}>ॐ</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--cream)', fontFamily: 'Georgia, serif' }}>
            You Are Invited
          </h2>
          <p className="text-lg mb-10 italic" style={{ color: 'rgba(240,247,242,0.65)', fontFamily: 'Georgia, serif' }}>
            Your presence will make our celebration complete. Please let us know you&apos;re coming.
          </p>
          <Link href="/rsvp" className="btn-gold px-12 py-4 rounded-full text-sm tracking-widest uppercase">
            RSVP Today
          </Link>
          {info.rsvp_deadline && (
            <p className="mt-4 text-xs" style={{ color: 'rgba(240,247,242,0.35)' }}>
              Kindly respond by{' '}
              {new Date(info.rsvp_deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function EventCard({ icon, title, date, time, venue, address, description, accent }: {
  icon: string; title: string; date: string; time: string;
  venue: string; address: string; description: string; accent: 'gold' | 'silver';
}) {
  const accentColor = accent === 'gold' ? 'var(--gold-light)' : 'var(--silver-light)';
  const dividerColor = accent === 'gold'
    ? 'linear-gradient(90deg, transparent, var(--gold), transparent)'
    : 'linear-gradient(90deg, transparent, var(--silver), transparent)';
  return (
    <div className="wedding-card rounded-2xl p-8 hover:scale-[1.02] transition-transform duration-300"
      style={{ borderColor: accent === 'gold' ? 'rgba(212,160,23,0.22)' : 'rgba(200,200,200,0.15)' }}>
      <div className="text-4xl mb-4 text-center">{icon}</div>
      <h3 className="text-2xl font-bold mb-2 text-center" style={{ color: accentColor, fontFamily: 'Georgia, serif' }}>
        {title}
      </h3>
      <div className="h-px my-4" style={{ background: dividerColor }} />
      <div className="space-y-2 mb-4">
        <p className="text-sm" style={{ color: 'rgba(240,247,242,0.88)' }}>📅 {date}</p>
        <p className="text-sm" style={{ color: 'rgba(240,247,242,0.88)' }}>⏰ {time}</p>
        <p className="text-sm" style={{ color: 'rgba(240,247,242,0.88)' }}>📍 {venue}</p>
        {address && <p className="text-xs" style={{ color: 'rgba(240,247,242,0.45)' }}>{address}</p>}
      </div>
      <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(240,247,242,0.6)' }}>
        {description}
      </p>
    </div>
  );
}

const traditions = [
  { icon: '🔥', name: 'Saptapadi',    desc: 'The Seven Steps — the couple walks seven steps around the sacred fire, each step a vow for life.' },
  { icon: '🌺', name: 'Var Mala',     desc: 'Exchange of floral garlands symbolising acceptance and the beginning of their journey as equals.' },
  { icon: '🪔', name: 'Mangalsutra',  desc: 'The sacred gold and black bead thread tied by the groom, marking their lifelong bond.' },
  { icon: '🌿', name: 'Mehendi',      desc: "Intricate henna on the bride's hands, said to deepen the love between the couple." },
  { icon: '🌟', name: 'Sindoor',      desc: "Vermillion in the bride's hair parting — a timeless mark of a married Hindu woman." },
  { icon: '🎊', name: 'Vidaai',       desc: 'The emotional farewell as the bride begins her beautiful new chapter with her husband.' },
];
