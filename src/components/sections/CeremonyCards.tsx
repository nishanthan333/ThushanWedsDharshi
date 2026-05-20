'use client';

import { useState } from 'react';

const ceremonies = [
  {
    icon: '🪔', name: 'Ganesh Pooja', tamil: 'கணேச பூஜை · Day 1 Morning',
    short: 'The very first ritual of any Hindu wedding. Lord Ganesha\'s blessings are invoked to remove all obstacles and bestow wisdom upon this new chapter.',
    detail: 'Flowers, coconuts, bananas and modak are offered at a beautifully decorated altar. The priest chants Ganapati mantras while both families gather together. Only after Lord Ganesha\'s blessings are received can any of the following ceremonies begin.',
    fact: '🌺 Ganesha is worshipped first at every auspicious occasion — he holds the power to both create and remove obstacles.',
  },
  {
    icon: '🌿', name: 'Nalangu', tamil: 'நலங்கு · Pre-Wedding Celebration',
    short: 'A joyful pre-wedding ceremony where both families come together for games, singing, and the application of turmeric paste — a purification ritual.',
    detail: 'The bride and groom are seated on decorated wooden peetam. Turmeric paste is applied by aunts and cousins — symbolising purification and inner glow. Games are played and women sing folk songs throughout the celebration.',
    fact: '🌺 Nalangu is one of the most festive parts — guests are encouraged to cheer, tease, and fill the hall with laughter!',
  },
  {
    icon: '🎭', name: 'Kashi Yathra', tamil: 'காசி யாத்திரை · The Pilgrimage Drama',
    short: 'A beloved theatrical ritual where the groom pretends to renounce the world — until the bride\'s father convinces him that marriage is the highest path.',
    detail: 'Dressed with a walking stick and fan, the groom dramatically declares he is leaving for Kashi (Varanasi). The bride\'s father intercepts him, assuring him that marrying his daughter is the highest dharma. The groom turns back, joyfully convinced.',
    fact: '🌺 A reminder that the householder path (grihastha ashrama) is one of the most sacred paths in Hinduism.',
  },
  {
    icon: '🌸', name: 'Kanyadanam', tamil: 'கன்னியாதானம் · Giving Away the Bride',
    short: 'The most emotional moment — the bride\'s father places her hand in the groom\'s and entrusts her to his care before the sacred fire and the whole family.',
    detail: 'Water is poured over joined hands as the bride\'s father chants the sacred verse: "I give you my daughter — please accept her." The groom takes a solemn vow to protect, love and honour her for life.',
    fact: '🌺 Kanyadanam is said to purify seven generations of the family on both sides.',
  },
  {
    icon: '💍', name: 'Muhurtham', tamil: 'முகூர்த்தம் · The Sacred Union',
    short: 'The heart of the wedding. At the auspicious moment, the groom ties the sacred Mangalsutra around the bride\'s neck — three knots, three promises.',
    detail: 'The Mangalsutra is the sacred symbol of marriage. As the nadaswaram plays and the crowd cheers, the groom ties three knots — three promises of love, protection and devotion. Flower petals cascade from above.',
    fact: '🌺 The exact Muhurtham minute is calculated by a Vedic astrologer — the luckiest moment the stars align for this union.',
  },
  {
    icon: '🔥', name: 'Sapthapadi', tamil: 'சப்தபதி · Seven Sacred Steps',
    short: 'The couple walks seven steps together around the sacred fire, each step a vow — for nourishment, strength, prosperity, wisdom, children, health, and friendship.',
    detail: 'Each step is taken to the rhythm of Vedic mantras. After the seventh step, the couple is declared husband and wife before Agni, the sacred fire, as eternal witness. Two souls are now bound for seven lifetimes.',
    fact: '🌺 In Hindu tradition, Sapthapadi IS the marriage — the union is spiritually complete the moment the seventh step is taken.',
  },
  {
    icon: '🎊', name: 'Reception', tamil: 'வரவேற்பு · The Celebration',
    short: 'The joyful celebration where family and friends officially welcome the newly married couple — with music, dancing, a lavish feast, and blessings all night long.',
    detail: 'An evening of music, laughter and celebration. Guests enjoy a sumptuous dinner as the newly wed couple is welcomed into their shared future. Speeches, dancing and warm wishes fill the night.',
    fact: '🌺 The reception is a gift from both families — a night of pure joy shared with everyone they love.',
  },
];

export default function CeremonyCards() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '22px' }}>
      {ceremonies.map((c, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            onClick={() => setOpen(isOpen ? null : i)}
            style={{
              border: '1px solid rgba(201,168,76,0.28)', background: 'white',
              cursor: 'pointer', overflow: 'hidden',
              transition: 'box-shadow 0.3s, transform 0.3s',
              boxShadow: isOpen ? '0 8px 40px rgba(26,92,58,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
              transform: isOpen ? 'translateY(-2px)' : 'none',
            }}
          >
            {/* Header */}
            <div style={{ background: 'var(--green-dark)', padding: '22px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>{c.icon}</span>
              <div>
                <h3 className="font-serif" style={{ fontSize: '1.28rem', color: 'white', marginBottom: '3px', fontWeight: 400 }}>{c.name}</h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--gold)', letterSpacing: '0.04em' }}>{c.tamil}</div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '22px 24px' }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-mid)', lineHeight: 1.72, marginBottom: '14px' }}>{c.short}</p>

              <button
                style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onClick={e => { e.stopPropagation(); setOpen(isOpen ? null : i); }}
              >
                <span style={{ display: 'inline-block', transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
                &nbsp; {isOpen ? 'Show less' : 'Read more'}
              </button>

              {isOpen && (
                <div style={{ borderTop: '1px solid var(--green-light)', paddingTop: '14px', marginTop: '12px' }}>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-mid)', lineHeight: 1.72, marginBottom: '10px' }}>{c.detail}</p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--gold-dark)', fontStyle: 'italic' }}>{c.fact}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
