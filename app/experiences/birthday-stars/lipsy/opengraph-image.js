import { ImageResponse } from 'next/og';

// Next.js generates this picture at build time. It is what shows up when the
// link is pasted into WhatsApp, Instagram, iMessage and so on.
export const alt = 'A birthday sky for Lipsy';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const DOTS = [
  [90, 80, 5], [210, 160, 3], [340, 60, 4], [520, 120, 3], [760, 70, 5], [940, 150, 3],
  [1090, 90, 4], [150, 420, 3], [60, 540, 5], [300, 560, 3], [880, 520, 4], [1040, 440, 3],
  [1120, 560, 5], [700, 570, 3], [430, 500, 4], [980, 300, 3], [120, 270, 4],
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: 'linear-gradient(160deg, #0a0920 0%, #1d1a52 100%)',
          color: '#eeebff',
        }}
      >
        {DOTS.map(([x, y, r], i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: r * 2,
              height: r * 2,
              borderRadius: 999,
              background: i % 3 === 0 ? '#ffd37a' : i % 5 === 0 ? '#ff8aa1' : '#eeebff',
              opacity: 0.85,
            }}
          />
        ))}
        <div style={{ fontSize: 30, letterSpacing: 8, color: '#a9a5d8', display: 'flex' }}>10 NOVEMBER</div>
        <div style={{ fontSize: 230, fontWeight: 700, lineHeight: 1.05, display: 'flex' }}>Lipsy</div>
        <div style={{ fontSize: 40, color: '#ff8aa1', display: 'flex' }}>A small sky, built for you.</div>
      </div>
    ),
    { ...size }
  );
}
