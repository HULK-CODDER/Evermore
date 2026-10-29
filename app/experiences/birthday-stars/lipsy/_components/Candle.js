'use client';

import { useRef, useState } from 'react';
import { bell, chord } from '../_lib/audio';
import { burst } from '../_lib/fx';

export default function Candle() {
  const [isLit, setIsLit] = useState(true);
  const flameRef = useRef(null);

  const blow = () => {
    if (!isLit) return;
    setIsLit(false);
    chord();
    const r = flameRef.current && flameRef.current.getBoundingClientRect();
    if (r) burst(r.left + r.width / 2, r.top, 110);
  };

  const relight = () => {
    if (isLit) return;
    setIsLit(true);
    bell(523.25, 0.06, 1.2);
  };

  return (
    <section className="sect" id="candle" aria-labelledby="t-candle">
      <div className="candle">
        <svg
          className={'cake' + (isLit ? '' : ' out')}
          viewBox="0 0 280 300"
          role="img"
          aria-label="A birthday cake with one lit candle"
          onClick={blow}
        >
          <defs>
            <radialGradient id="lipsyFlameGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style={{ stopColor: 'var(--gold)', stopOpacity: 0.5 }} />
              <stop offset="100%" style={{ stopColor: 'var(--gold)', stopOpacity: 0 }} />
            </radialGradient>
          </defs>
          <circle className="glow" cx="140" cy="62" r="84" fill="url(#lipsyFlameGlow)" />
          <ellipse cx="140" cy="266" rx="124" ry="15" fill="var(--ink-2)" stroke="var(--line)" />
          <rect x="38" y="190" width="204" height="74" rx="11" fill="var(--plum-2)" />
          <rect x="68" y="140" width="144" height="56" rx="10" fill="var(--plum)" />
          <rect x="64" y="132" width="152" height="18" rx="9" fill="var(--rose)" />
          <rect x="34" y="182" width="212" height="18" rx="9" fill="var(--rose)" />
          <rect x="82" y="146" width="9" height="20" rx="4.5" fill="var(--rose)" />
          <rect x="124" y="146" width="9" height="14" rx="4.5" fill="var(--rose)" />
          <rect x="170" y="146" width="9" height="24" rx="4.5" fill="var(--rose)" />
          <rect x="52" y="196" width="9" height="22" rx="4.5" fill="var(--rose)" />
          <rect x="108" y="196" width="9" height="14" rx="4.5" fill="var(--rose)" />
          <rect x="196" y="196" width="9" height="26" rx="4.5" fill="var(--rose)" />
          <rect x="90" y="222" width="7" height="3" rx="1.5" fill="var(--gold)" />
          <rect x="150" y="236" width="7" height="3" rx="1.5" fill="var(--gold)" />
          <rect x="186" y="228" width="7" height="3" rx="1.5" fill="var(--moon)" />
          <rect x="64" y="244" width="7" height="3" rx="1.5" fill="var(--moon)" />
          <rect x="112" y="162" width="7" height="3" rx="1.5" fill="var(--gold)" />
          <rect x="150" y="170" width="7" height="3" rx="1.5" fill="var(--moon)" />
          <rect x="134" y="88" width="12" height="46" rx="3" fill="var(--moon)" />
          <rect x="134" y="98" width="12" height="4" fill="var(--rose)" />
          <rect x="134" y="112" width="12" height="4" fill="var(--rose)" />
          <rect x="134" y="126" width="12" height="4" fill="var(--rose)" />
          <line x1="140" y1="88" x2="140" y2="80" stroke="var(--mist)" strokeWidth="2" strokeLinecap="round" />
          <g className="flame" ref={flameRef}>
            <path d="M140 42 C150 56 153 68 140 80 C127 68 130 56 140 42Z" fill="var(--gold)" />
            <path d="M140 58 C145 66 146 72 140 79 C134 72 135 66 140 58Z" fill="#fff4d6" />
          </g>
          <path
            className="smoke"
            d="M140 78 C130 66 150 58 140 44 C132 34 146 28 142 16"
            fill="none"
            stroke="var(--moon)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <div className="copy">
          <p className="mono">Make a wish</p>
          <h2 id="t-candle">Blow it out when you&apos;re ready.</h2>
          <p>Close your eyes and think of one thing. Keep it to yourself. Then tap the flame or the button.</p>
          <p className="made" aria-live="polite">{isLit ? '' : 'Wish made. It is yours to keep.'}</p>
          <div className="row">
            <button className="btn primary" type="button" onClick={blow} disabled={!isLit}>
              Blow it out
            </button>
            <button className="btn" type="button" onClick={relight} disabled={isLit}>
              Light it again
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
