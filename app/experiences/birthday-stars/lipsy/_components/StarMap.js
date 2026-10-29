'use client';

import { useMemo, useRef, useState } from 'react';
import { STARS, NOTES } from '../_lib/config';
import { bell, chord } from '../_lib/audio';
import { burst } from '../_lib/fx';

const SPARK = '0,-10 2.4,-2.4 10,0 2.4,2.4 0,10 -2.4,2.4 -10,0 -2.4,-2.4';

// Fixed seed so the server and the browser draw the same background dust.
function makeDust() {
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const out = [];
  for (let i = 0; i < 34; i++) {
    const x = rnd() * 420;
    const y = rnd() * 430;
    const r = 0.6 + rnd() * 0.9;
    const o = 0.25 + rnd() * 0.4;
    const near = STARS.some((s) => Math.hypot(x - s.x, y - s.y) < 34);
    if (!near) out.push({ x: x.toFixed(1), y: y.toFixed(1), r: r.toFixed(2), o: o.toFixed(2) });
  }
  return out;
}

export default function StarMap({ lit, light }) {
  const [active, setActive] = useState(null);
  const [swap, setSwap] = useState(0);
  const mapRef = useRef(null);
  const dust = useMemo(makeDust, []);

  const pick = (i) => {
    setActive(i);
    setSwap((n) => n + 1);
    bell(NOTES[i], 0.13, 2.4);
    const completed = light(i);
    if (completed) {
      setTimeout(() => {
        chord();
        const r = mapRef.current && mapRef.current.getBoundingClientRect();
        if (r) burst(r.left + r.width / 2, r.top + r.height / 2, 120);
      }, 450);
    }
  };

  return (
    <section className="sect" id="wishes" aria-labelledby="t-wishes">
      <div className="head">
        <p className="mono">Scorpius · the scorpion</p>
        <h2 id="t-wishes">Nine stars. Nine wishes.</h2>
        <p className="sub">
          Early November belongs to the scorpion, so I drew its stars for you. Each one holds a wish. Touch them all and
          see what happens.
        </p>
      </div>
      <div className="mapwrap">
        <div className="map" ref={mapRef}>
          <svg viewBox="0 0 420 430" role="group" aria-label="Star map of the constellation Scorpius with nine touchable stars">
            <defs>
              <radialGradient id="lipsyHalo">
                <stop offset="0%" style={{ stopColor: 'var(--gold)', stopOpacity: 0.55 }} />
                <stop offset="100%" style={{ stopColor: 'var(--gold)', stopOpacity: 0 }} />
              </radialGradient>
              <radialGradient id="lipsyHaloRose">
                <stop offset="0%" style={{ stopColor: 'var(--rose)', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: 'var(--rose)', stopOpacity: 0 }} />
              </radialGradient>
            </defs>
            <g>
              {dust.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="var(--mist)" opacity={d.o} />
              ))}
            </g>
            <line className="decor" x1="116" y1="96" x2="50" y2="108" />
            <line className="decor" x1="116" y1="96" x2="150" y2="70" />
            <circle cx="50" cy="108" r="2.2" fill="var(--mist)" opacity="0.6" />
            <circle cx="150" cy="70" r="2.2" fill="var(--mist)" opacity="0.6" />
            <g>
              {STARS.slice(0, -1).map((s, i) => (
                <line
                  key={i}
                  className={'link' + (lit.has(i) && lit.has(i + 1) ? ' on' : '')}
                  x1={s.x}
                  y1={s.y}
                  x2={STARS[i + 1].x}
                  y2={STARS[i + 1].y}
                />
              ))}
            </g>
            <text className="mapLabel" x="14" y="412">SCORPIUS</text>
            <g>
              {STARS.map((s, i) => {
                const heart = i === 2;
                const on = lit.has(i);
                return (
                  <g
                    key={s.name}
                    className={'star' + (heart ? ' heart' : '') + (on ? ' lit' : '') + (active === i ? ' active' : '')}
                    transform={`translate(${s.x} ${s.y})`}
                    style={{ '--i': i }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${s.name}, star ${i + 1} of 9, ${on ? 'lit' : 'not lit yet'}`}
                    onClick={() => pick(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        pick(i);
                      }
                    }}
                  >
                    <circle className="hit" r="28" fill="transparent" />
                    <circle className="ring" r={heart ? 24 : 18} />
                    <g className="body">
                      <circle className="halo" r={heart ? 46 : 32} fill={`url(#${heart ? 'lipsyHaloRose' : 'lipsyHalo'})`} />
                      <polygon className="core" points={SPARK} transform={`scale(${heart ? 1.5 : 1})`} />
                    </g>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <div className="panel">
          <div className="pips">
            {STARS.map((s, i) => (
              <span key={s.name} className={'pip' + (i < lit.size ? ' on' : '')} />
            ))}
            <span className="mono">{lit.size} / 9 lit</span>
          </div>
          <div>
            <p className="mono starname">{active === null ? 'Pick any star' : `Star ${active + 1} · ${STARS[active].name}`}</p>
            <p className={'wish' + (active === null ? '' : ' in')} key={swap} aria-live="polite">
              {active === null ? 'Touch a star to read what it holds.' : STARS[active].wish}
            </p>
          </div>
          {lit.size === 9 && (
            <a className="toLetter" href="#letter">
              The sky is complete. Your letter is waiting ↓
            </a>
          )}
          <dl className="facts">
            <div><dt>Sign</dt><dd>Scorpio ♏&#xFE0E; · 23 Oct to 21 Nov</dd></div>
            <div><dt>Birthstone</dt><dd>Topaz or citrine</dd></div>
            <div><dt>Flower</dt><dd>Chrysanthemum</dd></div>
            <div><dt>Heart star</dt><dd>Antares, the red one that marks the scorpion&apos;s heart</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
