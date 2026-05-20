import { getWeddingInfo } from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const info = getWeddingInfo();

  return (
    <div className="min-h-screen section-dark pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--gold)' }}>✦ Our Celebrations ✦</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: 'var(--cream)', fontFamily: 'Georgia, serif' }}>
            Event Details
          </h1>
          <p className="text-sm tracking-widest" style={{ color: 'rgba(255,248,231,0.5)' }}>{info.hashtag}</p>
        </div>

        {/* Hindu Ceremony */}
        <div className="wedding-card rounded-3xl p-10 md:p-16 mb-10 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 text-[200px] opacity-5 leading-none pointer-events-none"
            style={{ color: 'var(--gold)', fontFamily: 'Georgia, serif' }}
          >ॐ</div>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-5xl">🪔</span>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-1" style={{ color: 'var(--gold)' }}>Event One</p>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--gold-light)', fontFamily: 'Georgia, serif' }}>
                Hindu Ceremony
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <InfoRow icon="📅" label="Date" value="Wednesday, 1st July 2026" />
              <InfoRow icon="⏰" label="Time" value={info.ceremony_time} />
              <InfoRow icon="📍" label="Venue" value={info.ceremony_venue} />
              {info.ceremony_address && <InfoRow icon="🗺️" label="Address" value={info.ceremony_address} />}
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--gold)' }}>About the Ceremony</h3>
              <p className="leading-relaxed mb-4" style={{ color: 'rgba(255,248,231,0.75)', fontStyle: 'italic' }}>
                Witness the sacred union as Thushan and Dharshi exchange their vows in a traditional Hindu ceremony,
                filled with ancient Vedic rituals, sacred fire, beautiful flowers, and the blessings of family.
              </p>
              <p className="leading-relaxed" style={{ color: 'rgba(255,248,231,0.6)', fontSize: '0.9rem' }}>
                Guests are invited to dress in traditional or semi-formal attire. Ladies are welcome in saree or
                salwar kameez. Gentlemen in sherwani, kurta-pajama, or formal wear.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-bold mb-6" style={{ color: 'var(--gold)' }}>Ceremony Schedule</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {ceremonySchedule.map(item => (
                <ScheduleItem key={item.time} {...item} />
              ))}
            </div>
          </div>
        </div>

        {/* Reception */}
        <div className="wedding-card rounded-3xl p-10 md:p-16 mb-10 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 text-[200px] opacity-5 leading-none pointer-events-none"
            style={{ color: 'var(--gold-light)' }}
          >✨</div>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-5xl">🥂</span>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-1" style={{ color: 'var(--gold)' }}>Event Two</p>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--gold-light)', fontFamily: 'Georgia, serif' }}>
                Reception Party
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <InfoRow icon="📅" label="Date" value="Friday, 3rd July 2026" />
              <InfoRow icon="⏰" label="Time" value={info.reception_time} />
              <InfoRow icon="📍" label="Venue" value={info.reception_venue} />
              {info.reception_address && <InfoRow icon="🗺️" label="Address" value={info.reception_address} />}
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--gold)' }}>About the Reception</h3>
              <p className="leading-relaxed mb-4" style={{ color: 'rgba(255,248,231,0.75)', fontStyle: 'italic' }}>
                Join the newly wed couple for an unforgettable evening of celebration! An elegant reception
                with dinner, dancing, music, and memories that will last a lifetime.
              </p>
              <p className="leading-relaxed" style={{ color: 'rgba(255,248,231,0.6)', fontSize: '0.9rem' }}>
                Smart formal or semi-formal dress code. The evening will feature dinner, speeches,
                music, and dancing. Come ready to celebrate!
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-bold mb-6" style={{ color: 'var(--gold)' }}>Evening Schedule</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {receptionSchedule.map(item => (
                <ScheduleItem key={item.time} {...item} />
              ))}
            </div>
          </div>
        </div>

        {/* Dress code & info */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="wedding-card rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--gold)' }}>👗 Dress Code</h3>
            <ul className="space-y-2" style={{ color: 'rgba(255,248,231,0.75)', fontSize: '0.9rem' }}>
              <li>• Ceremony: Traditional or Semi-formal</li>
              <li>• Ladies: Saree, Salwar Kameez, or formal gown</li>
              <li>• Gentlemen: Sherwani, Kurta-Pajama, or suit</li>
              <li>• Reception: Smart formal or semi-formal</li>
              <li>• No white or black please (for reception)</li>
            </ul>
          </div>
          <div className="wedding-card rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--gold)' }}>ℹ️ Good to Know</h3>
            <ul className="space-y-2" style={{ color: 'rgba(255,248,231,0.75)', fontSize: '0.9rem' }}>
              <li>• Please RSVP by the deadline</li>
              <li>• Dietary requirements accommodated</li>
              <li>• Photography is welcome</li>
              <li>• Both events are fully catered</li>
              <li>• Children are welcome at both events</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link href="/rsvp" className="btn-gold px-12 py-4 rounded-full text-sm tracking-widest uppercase">
            RSVP for Both Events
          </Link>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div>
      <p className="text-xs tracking-widest uppercase mb-1" style={{ color: 'rgba(255,248,231,0.4)' }}>{label}</p>
      <p className="text-lg" style={{ color: 'var(--cream)' }}>
        <span className="mr-2">{icon}</span>{value}
      </p>
    </div>
  );
}

function ScheduleItem({ time, event, icon }: { time: string; event: string; icon: string }) {
  return (
    <div className="p-4 rounded-xl" style={{ background: 'rgba(212,160,23,0.05)', border: '1px solid rgba(212,160,23,0.1)' }}>
      <span className="text-xl mb-2 block">{icon}</span>
      <p className="text-xs tracking-widest mb-1" style={{ color: 'var(--gold)' }}>{time}</p>
      <p className="text-sm" style={{ color: 'rgba(255,248,231,0.8)' }}>{event}</p>
    </div>
  );
}

const ceremonySchedule = [
  { time: '9:30 AM', event: 'Guests Arrive & Blessing', icon: '🌸' },
  { time: '10:00 AM', event: 'Ceremony Begins', icon: '🔥' },
  { time: '11:30 AM', event: 'Sacred Vows & Rituals', icon: '💍' },
  { time: '12:30 PM', event: 'Photo Time', icon: '📸' },
  { time: '1:00 PM', event: 'Celebratory Lunch', icon: '🍽️' },
  { time: '3:00 PM', event: 'Farewell & Blessings', icon: '🪷' },
];

const receptionSchedule = [
  { time: '5:30 PM', event: 'Guests Arrive', icon: '🥂' },
  { time: '6:00 PM', event: 'Reception Begins', icon: '✨' },
  { time: '6:30 PM', event: 'Couple\'s Grand Entry', icon: '💫' },
  { time: '7:00 PM', event: 'Dinner Served', icon: '🍽️' },
  { time: '8:00 PM', event: 'Speeches & Toasts', icon: '🎙️' },
  { time: '8:30 PM', event: 'Dancing & Celebration', icon: '🎊' },
];
