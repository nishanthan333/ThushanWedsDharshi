export default function Footer() {
  return (
    <footer style={{ background: '#0B2416', padding: '64px 48px 44px', textAlign: 'center' }}>
      {/* Ganesha SVG */}
      <svg width="56" height="68" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '14px', opacity: 0.85 }}>
        <circle cx="50" cy="45" r="39" stroke="#C9A84C" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.35"/>
        <ellipse cx="50" cy="90" rx="23" ry="22" fill="#C9A84C" opacity="0.08" stroke="#C9A84C" strokeWidth="1"/>
        <ellipse cx="50" cy="43" rx="23" ry="25" fill="#C9A84C" opacity="0.12" stroke="#C9A84C" strokeWidth="1.5"/>
        <ellipse cx="22" cy="39" rx="10" ry="13" fill="#C9A84C" opacity="0.08" stroke="#C9A84C" strokeWidth="1"/>
        <ellipse cx="78" cy="39" rx="10" ry="13" fill="#C9A84C" opacity="0.08" stroke="#C9A84C" strokeWidth="1"/>
        <circle cx="43" cy="37" r="2.5" fill="#C9A84C" opacity="0.7"/>
        <circle cx="57" cy="37" r="2.5" fill="#C9A84C" opacity="0.7"/>
        <circle cx="50" cy="29" r="1.8" fill="#C9A84C" opacity="0.8"/>
        <path d="M46 53 Q39 63 35 72 Q32 79 38 80 Q45 82 47 75" stroke="#C9A84C" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M31 21 L35 10 L42 17 L50 6 L58 17 L65 10 L69 21" stroke="#C9A84C" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
        <line x1="28" y1="74" x2="16" y2="88" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" opacity="0.45"/>
        <line x1="72" y1="74" x2="84" y2="88" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" opacity="0.45"/>
        <text x="50" y="95" textAnchor="middle" fontSize="13" fill="#C9A84C" opacity="0.55" fontFamily="serif">ॐ</text>
      </svg>

      <p className="font-serif" style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--gold)', marginBottom: '4px' }}>
        With the blessings of Lord Ganesha
      </p>
      <p style={{ fontSize: '0.82rem', color: 'rgba(201,168,76,0.42)', marginBottom: '32px' }}>
        ஸ்ரீ கணேசாய நமஹ
      </p>
      <div style={{ width: '56px', height: '1px', background: 'rgba(201,168,76,0.22)', margin: '0 auto 20px' }} />
      <div className="font-display" style={{ fontSize: '2.8rem', color: 'white', marginBottom: '8px' }}>
        Thushan &amp; Dharshi
      </div>
      <p style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase' }}>
        1st July 2026 &nbsp;·&nbsp; Hindu Ceremony &nbsp;&nbsp;|&nbsp;&nbsp; 3rd July 2026 &nbsp;·&nbsp; Reception
      </p>
      <div style={{ width: '56px', height: '1px', background: 'rgba(201,168,76,0.22)', margin: '26px auto' }} />
      <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.1em' }}>
        #ThushanWedsDharshi &nbsp;·&nbsp; A Hindu Wedding &nbsp;·&nbsp; Made with love 🌿
      </p>
    </footer>
  );
}
