import { getGallery, GalleryItem } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const items = getGallery() as GalleryItem[];

  return (
    <div className="min-h-screen section-dark pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--gold)' }}>✦ Memories ✦</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--cream)', fontFamily: 'Georgia, serif' }}>
            Our Gallery
          </h1>
          <p className="text-lg italic max-w-2xl mx-auto" style={{ color: 'rgba(255,248,231,0.6)', fontFamily: 'Georgia, serif' }}>
            Every photograph tells a piece of our love story. Images coming soon — stay tuned!
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-8xl mb-8">📸</div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--gold-light)', fontFamily: 'Georgia, serif' }}>
              Gallery Coming Soon
            </h2>
            <p className="text-lg italic" style={{ color: 'rgba(255,248,231,0.5)' }}>
              We&apos;re curating our most beautiful moments just for you.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-2xl mx-auto">
              {['🪔','🌸','✨','🪷','💫','🌺','🎊','💛'].map((emoji, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-2xl wedding-card flex items-center justify-center"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <span className="text-3xl opacity-40">{emoji}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Category filter could go here */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {items.map(item => (
                <GalleryCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}

        <div className="text-center mt-16">
          <div className="ornament-divider mb-8">
            <span style={{ color: 'var(--gold)' }}>✦</span>
          </div>
          <p className="text-sm tracking-widest" style={{ color: 'var(--gold)' }}>#ThushanWedsDharshi</p>
          <p className="text-sm mt-2" style={{ color: 'rgba(255,248,231,0.4)' }}>
            Share your photos from our celebrations using our hashtag
          </p>
        </div>
      </div>
    </div>
  );
}

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <div className="break-inside-avoid mb-4 wedding-card rounded-2xl overflow-hidden group cursor-pointer">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.url}
        alt={item.title || 'Wedding photo'}
        className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      {(item.title || item.description) && (
        <div className="p-4">
          {item.title && (
            <p className="font-bold mb-1" style={{ color: 'var(--gold-light)' }}>{item.title}</p>
          )}
          {item.description && (
            <p className="text-sm" style={{ color: 'rgba(255,248,231,0.6)' }}>{item.description}</p>
          )}
        </div>
      )}
    </div>
  );
}
