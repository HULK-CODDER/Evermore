import { ImageResponse } from 'next/og';

// Browser-tab icon: a gold star on the night sky.
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0920',
          borderRadius: 14,
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 999,
            background: '#ffd37a',
            boxShadow: '0 0 18px 6px rgba(255,211,122,0.7)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
