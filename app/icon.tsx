import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 512, height: 512 };

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #10B981 0%, #0F766E 100%)' }}>
        <div style={{ width: '74%', height: '74%', borderRadius: 104, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <svg viewBox="0 0 24 24" width="220" height="220" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 17l5-5 4 3 7-8" />
            <path d="M15 7h5v5" />
          </svg>
        </div>
      </div>
    ),
    { width: 512, height: 512 },
  );
}
