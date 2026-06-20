import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 180, height: 180 };

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #047857 0%, #0284C7 100%)',
        }}
      >
        <div
          style={{
            width: '74%',
            height: '74%',
            borderRadius: 36,
            background: 'rgba(255,255,255,0.14)',
            border: '4px solid rgba(255,255,255,0.28)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 58,
            fontWeight: 850,
            letterSpacing: -3,
          }}
        >
          SF
        </div>
      </div>
    ),
    { width: 180, height: 180 },
  );
}
