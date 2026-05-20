import { getFamilyMembers, FamilyMember } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function FamilyTreePage() {
  const members = getFamilyMembers() as FamilyMember[];
  const groomFamily = members.filter(m => m.side === 'groom');
  const brideFamily = members.filter(m => m.side === 'bride');

  return (
    <div className="min-h-screen section-dark pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--gold)' }}>✦ Our Families ✦</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--cream)', fontFamily: 'Georgia, serif' }}>
            Family Tree
          </h1>
          <p className="text-lg italic max-w-2xl mx-auto" style={{ color: 'rgba(255,248,231,0.6)', fontFamily: 'Georgia, serif' }}>
            Two families, one beautiful union. The roots that raised them and the love that brought them together.
          </p>
        </div>

        {/* Union symbol */}
        <div className="flex items-center justify-center gap-6 mb-16">
          <div className="h-px flex-1 max-w-48" style={{ background: 'linear-gradient(90deg, transparent, var(--gold))' }} />
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
            style={{ background: 'linear-gradient(135deg, rgba(212,160,23,0.2), rgba(155,27,48,0.2))', border: '1px solid rgba(212,160,23,0.4)' }}
          >ॐ</div>
          <div className="h-px flex-1 max-w-48" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
        </div>

        {/* Couple center */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
          <CoupleCard name="Thushan" role="Groom" side="groom" />
          <div className="flex flex-col items-center gap-2">
            <div className="text-3xl" style={{ color: 'var(--gold)' }}>💍</div>
            <div className="text-xs tracking-widest" style={{ color: 'var(--gold)' }}>1 · 7 · 2026</div>
          </div>
          <CoupleCard name="Dharshi" role="Bride" side="bride" />
        </div>

        {/* Family sections */}
        <div className="grid md:grid-cols-2 gap-12">
          <FamilySide title="Groom's Family" side="groom" members={groomFamily} />
          <FamilySide title="Bride's Family" side="bride" members={brideFamily} />
        </div>

        {/* Quote */}
        <div className="text-center mt-20">
          <div className="ornament-divider mb-8">
            <span style={{ color: 'var(--gold)' }}>✦</span>
          </div>
          <p
            className="text-xl italic max-w-2xl mx-auto"
            style={{ color: 'rgba(255,248,231,0.6)', fontFamily: 'Georgia, serif' }}
          >
            &ldquo;The bond between families is the greatest gift a wedding can give.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

function CoupleCard({ name, role, side }: { name: string; role: string; side: 'groom' | 'bride' }) {
  const isGroom = side === 'groom';
  return (
    <div
      className="flex flex-col items-center p-8 rounded-2xl min-w-48"
      style={{
        background: isGroom
          ? 'linear-gradient(135deg, rgba(212,160,23,0.1), rgba(61,12,94,0.1))'
          : 'linear-gradient(135deg, rgba(155,27,48,0.1), rgba(212,160,23,0.1))',
        border: `1px solid ${isGroom ? 'rgba(212,160,23,0.4)' : 'rgba(155,27,48,0.4)'}`,
      }}
    >
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-4"
        style={{
          background: isGroom
            ? 'linear-gradient(135deg, rgba(212,160,23,0.2), rgba(61,12,94,0.3))'
            : 'linear-gradient(135deg, rgba(155,27,48,0.2), rgba(232,180,184,0.2))',
          border: `2px solid ${isGroom ? 'rgba(212,160,23,0.5)' : 'rgba(155,27,48,0.5)'}`,
        }}
      >
        {isGroom ? '🤵' : '👰'}
      </div>
      <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--gold-light)', fontFamily: 'Georgia, serif' }}>
        {name}
      </h3>
      <p className="text-sm tracking-widest uppercase" style={{ color: isGroom ? 'var(--gold)' : 'var(--rose)' }}>
        {role}
      </p>
    </div>
  );
}

function FamilySide({ title, side, members }: { title: string; side: 'groom' | 'bride'; members: FamilyMember[] }) {
  const isGroom = side === 'groom';
  const couple = members.find(m => m.relation.toLowerCase().includes(isGroom ? 'groom' : 'bride') && !m.parent_id);
  const rest = members.filter(m => m !== couple);

  return (
    <div>
      <h2
        className="text-2xl font-bold mb-8 text-center"
        style={{ color: isGroom ? 'var(--gold-light)' : 'var(--rose)', fontFamily: 'Georgia, serif' }}
      >
        {title}
      </h2>
      <div className="space-y-4">
        {rest.map(member => (
          <FamilyMemberCard key={member.id} member={member} isGroom={isGroom} />
        ))}
        {rest.length === 0 && (
          <p className="text-center italic" style={{ color: 'rgba(255,248,231,0.4)' }}>
            Family details coming soon...
          </p>
        )}
      </div>
    </div>
  );
}

function FamilyMemberCard({ member, isGroom }: { member: FamilyMember; isGroom: boolean }) {
  return (
    <div
      className="flex items-center gap-4 p-5 rounded-xl"
      style={{
        background: 'rgba(255,248,231,0.03)',
        border: `1px solid ${isGroom ? 'rgba(212,160,23,0.15)' : 'rgba(155,27,48,0.2)'}`,
      }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0"
        style={{
          background: isGroom ? 'rgba(212,160,23,0.1)' : 'rgba(155,27,48,0.1)',
          border: `1px solid ${isGroom ? 'rgba(212,160,23,0.3)' : 'rgba(155,27,48,0.3)'}`,
        }}
      >
        {member.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={member.photo_url} alt={member.name} className="w-full h-full rounded-full object-cover" />
        ) : (
          isGroom ? '👴' : '👵'
        )}
      </div>
      <div>
        <p className="font-bold" style={{ color: 'var(--cream)' }}>{member.name}</p>
        <p className="text-sm" style={{ color: isGroom ? 'var(--gold)' : 'var(--rose)' }}>{member.relation}</p>
        {member.description && (
          <p className="text-xs mt-1" style={{ color: 'rgba(255,248,231,0.5)' }}>{member.description}</p>
        )}
      </div>
    </div>
  );
}
