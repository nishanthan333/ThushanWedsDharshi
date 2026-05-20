'use client';

import { useEffect, useState } from 'react';

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; }

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [t, setT] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calc() {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    }
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: 'Days',    value: t.days    },
    { label: 'Hours',   value: t.hours   },
    { label: 'Minutes', value: t.minutes },
    { label: 'Seconds', value: t.seconds },
  ];

  return (
    <div className="flex gap-4 md:gap-8 justify-center">
      {units.map(({ label, value }, i) => (
        <div key={label} className="flex flex-col items-center">
          <div
            className="wedding-card rounded-lg w-16 md:w-24 h-16 md:h-24 flex items-center justify-center mb-2"
            style={{
              boxShadow: i % 2 === 0
                ? '0 0 18px rgba(212,160,23,0.15), inset 0 0 12px rgba(212,160,23,0.04)'
                : '0 0 18px rgba(200,200,200,0.10), inset 0 0 12px rgba(200,200,200,0.03)',
              borderColor: i % 2 === 0 ? 'rgba(212,160,23,0.22)' : 'rgba(200,200,200,0.14)',
            }}
          >
            <span
              className="text-2xl md:text-4xl font-bold"
              style={{ color: i % 2 === 0 ? 'var(--gold-light)' : 'var(--silver-light)' }}
            >
              {String(value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(200,200,200,0.45)' }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
