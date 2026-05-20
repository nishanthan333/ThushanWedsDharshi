'use client';

import dynamic from 'next/dynamic';

const WeddingScene = dynamic(() => import('./WeddingScene'), { ssr: false });

export default function WeddingSceneClient() {
  return <WeddingScene />;
}
