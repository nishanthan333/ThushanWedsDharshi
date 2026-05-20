'use client';

import { useState } from 'react';

const cards = [
  { icon: '🌿', hint: 'Their first meeting', fact: 'They first met at a family friend\'s Deepavali celebration — Thushan couldn\'t stop stealing glances across the room.' },
  { icon: '🍛', hint: 'The proposal', fact: 'Thushan proposed at their favourite restaurant over a candlelit dinner — she said yes before he could finish the question.' },
  { icon: '🎶', hint: 'Their song', fact: 'They bonded over a shared love of Tamil film music — their first dance playlist has been in the works for months.' },
  { icon: '🛕', hint: 'First official date', fact: 'Their first proper date was a Sunday temple visit followed by a long walk and too much ice cream.' },
];

export default function FlipCards() {
  const [flipped, setFlipped] = useState<number[]>([]);

  function toggle(i: number) {
    setFlipped(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginTop: '28px' }}>
      {cards.map((c, i) => {
        const isFlipped = flipped.includes(i);
        return (
          <div
            key={i}
            onClick={() => toggle(i)}
            style={{ perspective: '700px', cursor: 'pointer', height: '110px' }}
          >
            <div style={{
              position: 'relative', width: '100%', height: '100%',
              transition: 'transform 0.6s', transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'none',
            }}>
              {/* Front */}
              <div style={{
                position: 'absolute', width: '100%', height: '100%',
                backfaceVisibility: 'hidden', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', padding: '14px',
                background: 'var(--green-dark)', border: '1px solid rgba(201,168,76,0.25)',
              }}>
                <span style={{ fontSize: '1.7rem', marginBottom: '5px' }}>{c.icon}</span>
                <span style={{ fontSize: '0.63rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                  Tap to reveal
                </span>
              </div>
              {/* Back */}
              <div style={{
                position: 'absolute', width: '100%', height: '100%',
                backfaceVisibility: 'hidden', background: 'var(--gold)',
                transform: 'rotateY(180deg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px',
              }}>
                <p className="font-serif" style={{ fontSize: '0.88rem', color: '#1A2B22', lineHeight: 1.45, textAlign: 'center' }}>
                  {c.fact}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
