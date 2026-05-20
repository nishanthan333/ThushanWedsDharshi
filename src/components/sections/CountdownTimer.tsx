'use client';

import { useEffect, useState } from 'react';

interface T { days: number; hours: number; minutes: number; seconds: number; }

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [t, setT] = useState<T>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calc(): T {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      };
    }
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: 'Days',    value: t.days },
    { label: 'Hours',   value: t.hours },
    { label: 'Minutes', value: t.minutes },
    { label: 'Seconds', value: t.seconds },
  ];

  return (
    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {units.map(({ label, value }, i) => (
        <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
          <div style={{ textAlign: 'center', minWidth: '68px' }}>
            <span className="font-serif" style={{ display: 'block', fontSize: '3.2rem', fontWeight: 300, color: 'white', lineHeight: 1 }}>
              {String(value).padStart(2, '0')}
            </span>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.22em', color: 'var(--gold)', textTransform: 'uppercase', marginTop: '4px', display: 'block', fontFamily: 'var(--font-lato)' }}>
              {label}
            </span>
          </div>
          {i < 3 && (
            <span className="font-serif" style={{ fontSize: '2.5rem', color: 'rgba(201,168,76,0.4)', paddingTop: '6px' }}>·</span>
          )}
        </div>
      ))}
    </div>
  );
}
