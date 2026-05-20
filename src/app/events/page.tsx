import { getWeddingInfo } from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const info = getWeddingInfo();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(155deg, #0C2E1A, #1A5C3A)', padding: '120px 48px 60px', textAlign: 'center' }}>
        <p className="sec-label" style={{ color: 'var(--gold)' }}>✦ Our Celebrations ✦</p>
        <h1 className="font-display" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', color: 'white', marginBottom: '12px' }}>
          Event Details
        </h1>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.2em', color: 'rgba(201,168,76,0.65)', textTransform: 'uppercase' }}>
          {info.hashtag}
        </p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 48px' }}>

        {/* Ceremony */}
        <EventCard
          icon="🪔" badge="Event One" title="Hindu Ceremony"
          date="Wednesday, 1st July 2026" time={info.ceremony_time}
          venue={info.ceremony_venue} address={info.ceremony_address}
          about="Witness the sacred union as Thushan and Dharshi exchange their vows in a traditional Hindu ceremony, filled with ancient Vedic rituals, sacred fire, flowers, and the blessings of both families."
          dress="Traditional or semi-formal. Ladies are welcome in saree or salwar kameez. Gentlemen in sherwani, kurta-pajama, or formal wear."
          schedule={[
            { time: '9:30 AM', event: 'Guests Arrive & Ganesh Pooja', icon: '🌸' },
            { time: '10:00 AM', event: 'Main Ceremony Begins', icon: '🔥' },
            { time: '11:00 AM', event: 'Muhurtham — Sacred Union', icon: '💍' },
            { time: '12:00 PM', event: 'Sapthapadi & Blessings', icon: '👣' },
            { time: '12:30 PM', event: 'Photography & Family Portraits', icon: '📸' },
            { time: '1:00 PM', event: 'Celebratory Lunch', icon: '🍽️' },
          ]}
        />

        <div style={{ height: '32px' }} />

        {/* Reception */}
        <EventCard
          icon="🥂" badge="Event Two" title="Reception Party"
          date="Friday, 3rd July 2026" time={info.reception_time}
          venue={info.reception_venue} address={info.reception_address}
          about="Join the newly wed couple for an unforgettable evening of celebration. An elegant reception with dinner, dancing, heartfelt speeches and memories to last a lifetime."
          dress="Smart formal or semi-formal. Please avoid all-white or all-black outfits. Come ready to dance!"
          schedule={[
            { time: '5:30 PM', event: 'Guests Arrive', icon: '🌿' },
            { time: '6:00 PM', event: 'Reception Opens', icon: '✨' },
            { time: '6:30 PM', event: 'Couple\'s Grand Entry', icon: '💫' },
            { time: '7:00 PM', event: 'Dinner Served', icon: '🍽️' },
            { time: '8:00 PM', event: 'Speeches & Toasts', icon: '🎙️' },
            { time: '8:30 PM', event: 'Dancing & Celebration', icon: '🎊' },
          ]}
        />

        {/* Info cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '40px', marginBottom: '48px' }}>
          <InfoCard title="👗 Dress Code" items={[
            'Ceremony: Traditional or semi-formal',
            'Ladies: Saree, Salwar Kameez, or formal gown',
            'Gentlemen: Sherwani, Kurta-Pajama, or suit',
            'Reception: Smart formal or semi-formal',
            'Please avoid all-white or all-black outfits',
          ]} />
          <InfoCard title="ℹ️ Good to Know" items={[
            'Please RSVP by the deadline',
            'Dietary requirements fully accommodated',
            'Photography warmly welcome',
            'Both events are fully catered',
            'Children are welcome at both events',
          ]} />
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/rsvp" className="btn-primary" style={{ padding: '14px 48px' }}>
            RSVP for Both Events
          </Link>
        </div>
      </div>
    </div>
  );
}

function EventCard({ icon, badge, title, date, time, venue, address, about, dress, schedule }: {
  icon: string; badge: string; title: string; date: string; time: string;
  venue: string; address: string; about: string; dress: string;
  schedule: { time: string; event: string; icon: string }[];
}) {
  return (
    <div style={{ border: '1px solid rgba(201,168,76,0.28)', background: 'white', overflow: 'hidden' }}>
      {/* Header band */}
      <div style={{ background: 'var(--green-dark)', padding: '28px 36px', display: 'flex', alignItems: 'center', gap: '18px' }}>
        <span style={{ fontSize: '2.5rem' }}>{icon}</span>
        <div>
          <p style={{ fontSize: '0.63rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '4px' }}>{badge}</p>
          <h2 className="font-serif" style={{ fontSize: '1.9rem', color: 'white', fontWeight: 400 }}>{title}</h2>
        </div>
      </div>

      <div style={{ padding: '36px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px' }}>
        <div>
          <h3 style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px', fontFamily: 'var(--font-lato)' }}>Details</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <Row icon="📅" value={date} />
            <Row icon="⏰" value={time} />
            <Row icon="📍" value={venue} />
            {address && <Row icon="🗺️" value={address} small />}
          </div>
          <div style={{ borderTop: '1px solid var(--green-light)', paddingTop: '20px' }}>
            <h3 style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px', fontFamily: 'var(--font-lato)' }}>About</h3>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.78, color: 'var(--text-mid)', marginBottom: '12px' }}>{about}</p>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: 'var(--text-mid)', fontStyle: 'italic' }}><strong>Dress:</strong> {dress}</p>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px', fontFamily: 'var(--font-lato)' }}>Schedule</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {schedule.map(s => (
              <div key={s.time} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '10px 12px', background: 'var(--green-light)', border: '1px solid rgba(201,168,76,0.12)' }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{s.icon}</span>
                <div>
                  <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '2px' }}>{s.time}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-dark)' }}>{s.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, value, small }: { icon: string; value: string; small?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
      <span style={{ fontSize: '1rem', flexShrink: 0 }}>{icon}</span>
      <p style={{ fontSize: small ? '0.82rem' : '0.9rem', color: small ? 'var(--text-mid)' : 'var(--text-dark)', lineHeight: 1.5 }}>{value}</p>
    </div>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={{ border: '1px solid rgba(201,168,76,0.22)', padding: '28px 26px', background: 'var(--green-light)' }}>
      <h3 className="font-serif" style={{ fontSize: '1.1rem', color: 'var(--green-dark)', marginBottom: '16px', fontWeight: 600 }}>{title}</h3>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((item, i) => (
          <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-mid)', paddingLeft: '12px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--gold)' }}>·</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
