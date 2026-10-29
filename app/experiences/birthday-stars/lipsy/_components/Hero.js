'use client';

import { useEffect, useRef, useState } from 'react';
import { CFG, NOTES } from '../_lib/config';
import { bell } from '../_lib/audio';
import { burst } from '../_lib/fx';

const pad = (n) => String(n).padStart(2, '0');
const DAY = 86400000;

export default function Hero() {
  const canvasRef = useRef(null);
  const h1Ref = useRef(null);
  const [left, setLeft] = useState(null);
  const [phase, setPhase] = useState('before');

  /* countdown to the birthday */
  useEffect(() => {
    const T = new Date(CFG.target).getTime();
    const tick = () => {
      const now = Date.now();
      const ms = T - now;
      if (ms > 0) {
        const s = Math.floor(ms / 1000);
        setPhase('before');
        setLeft({ d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 });
      } else if (now < T + DAY) {
        setPhase('day');
      } else {
        setPhase('after');
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* confetti when the day arrives */
  useEffect(() => {
    if (phase !== 'day') return;
    const id = setTimeout(() => burst(window.innerWidth / 2, window.innerHeight * 0.4, 140), 1200);
    return () => clearTimeout(id);
  }, [phase]);

  /* particles that gather into her name */
  useEffect(() => {
    const hc = canvasRef.current;
    const hx = hc.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rand = (a, b) => a + Math.random() * (b - a);
    const COLS = ['rgb(238,235,255)', 'rgb(255,211,122)', 'rgb(255,138,161)'];

    let cancelled = false;
    let raf = 0;
    let HW = 1;
    let HH = 1;
    let parts = [];
    let groups = [[], [], []];
    let visible = true;
    let born = 0;
    let px = -999;
    let py = -999;
    let ready = false;
    const family = getComputedStyle(h1Ref.current).fontFamily;

    const sizeHero = () => {
      const r = hc.getBoundingClientRect();
      const d = Math.min(2, window.devicePixelRatio || 1);
      HW = Math.max(1, Math.round(r.width));
      HH = Math.max(1, Math.round(r.height));
      hc.width = HW * d;
      hc.height = HH * d;
      hx.setTransform(d, 0, 0, d, 0, 0);
    };

    const newPart = () => {
      const r = Math.random();
      return {
        x: rand(0, HW), y: rand(-HH * 0.3, HH * 1.3), vx: 0, vy: 0, tx: 0, ty: 0,
        d: reduce ? 0 : rand(0, 1400), s: rand(1.1, 2.3), ph: rand(0, 6.28),
        g: r < 0.72 ? 0 : r < 0.9 ? 1 : 2,
      };
    };

    const buildTargets = () => {
      const off = document.createElement('canvas');
      off.width = HW;
      off.height = HH;
      const o = off.getContext('2d', { willReadFrequently: true });
      let fs = Math.min(HH * 0.86, (HW * 0.95) / 2.6);
      const setF = () => {
        o.font = `400 ${fs}px ${family}`;
      };
      setF();
      const mw = o.measureText(CFG.name).width;
      if (mw > HW * 0.94) {
        fs = (fs * HW * 0.94) / mw;
        setF();
      }
      const m = o.measureText(CFG.name);
      const asc = m.actualBoundingBoxAscent || fs * 0.7;
      const desc = m.actualBoundingBoxDescent || fs * 0.25;
      o.textAlign = 'center';
      o.textBaseline = 'alphabetic';
      o.fillStyle = '#fff';
      o.fillText(CFG.name, HW / 2, HH / 2 + (asc - desc) / 2);
      const data = o.getImageData(0, 0, HW, HH).data;
      let step = HW < 520 ? 3 : 4;
      let pts;
      do {
        pts = [];
        for (let y = 0; y < HH; y += step) {
          for (let x = 0; x < HW; x += step) {
            if (data[(y * HW + x) * 4 + 3] > 140) {
              pts.push([x + rand(-step, step) * 0.35, y + rand(-step, step) * 0.35]);
            }
          }
        }
        step++;
      } while (pts.length > 5200);
      for (let i = pts.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        [pts[i], pts[j]] = [pts[j], pts[i]];
      }
      while (parts.length < pts.length) parts.push(newPart());
      parts.length = pts.length;
      groups = [[], [], []];
      parts.forEach((p, k) => {
        p.tx = pts[k][0];
        p.ty = pts[k][1];
        if (reduce) {
          p.x = p.tx;
          p.y = p.ty;
        }
        groups[p.g].push(p);
      });
    };

    const frame = (t) => {
      if (!visible || !parts.length) return;
      if (!born) born = t;
      const el = t - born;
      const R = 90;
      const R2 = R * R;
      hx.globalCompositeOperation = 'source-over';
      hx.clearRect(0, 0, HW, HH);
      for (const p of parts) {
        if (el < p.d) {
          p.x += Math.sin(t * 0.0008 + p.ph) * 0.25;
          p.y += Math.cos(t * 0.0007 + p.ph) * 0.25;
          continue;
        }
        let ax = (p.tx - p.x) * 0.03;
        let ay = (p.ty - p.y) * 0.03;
        const dx = p.x - px;
        const dy = p.y - py;
        const d2 = dx * dx + dy * dy;
        if (d2 < R2 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = (1 - d / R) * 3.2;
          ax += (dx / d) * f;
          ay += (dy / d) * f;
        }
        p.vx = (p.vx + ax) * 0.86;
        p.vy = (p.vy + ay) * 0.86;
        p.x += p.vx;
        p.y += p.vy;
      }
      hx.globalCompositeOperation = 'lighter';
      for (let g = 0; g < 3; g++) {
        hx.fillStyle = COLS[g];
        for (const p of groups[g]) {
          hx.globalAlpha = reduce ? 0.85 : 0.55 + 0.45 * Math.sin(t * 0.003 + p.ph);
          const sh = reduce ? 0 : Math.sin(t * 0.002 + p.ph) * 0.4;
          hx.fillRect(p.x + sh, p.y + sh, p.s, p.s);
        }
      }
      hx.globalAlpha = 1;
    };

    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      frame(t);
    };

    const scatter = (x, y) => {
      for (const p of parts) {
        const dx = p.x - x;
        const dy = p.y - y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        if (d < 220) {
          const f = (1 - d / 220) * 16;
          p.vx += (dx / d) * f + rand(-2, 2);
          p.vy += (dy / d) * f + rand(-2, 2);
        }
      }
    };

    const pos = (e) => {
      const r = hc.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
    };
    const onMove = (e) => pos(e);
    const onLeave = () => {
      px = py = -999;
    };
    const onUp = (e) => {
      if (e.pointerType === 'touch') px = py = -999;
    };
    const onDown = (e) => {
      pos(e);
      if (!reduce) scatter(px, py);
      bell(NOTES[(Math.random() * NOTES.length) | 0] * 2, 0.06, 1.6);
    };
    hc.addEventListener('pointermove', onMove);
    hc.addEventListener('pointerleave', onLeave);
    hc.addEventListener('pointerup', onUp);
    hc.addEventListener('pointerdown', onDown);

    let io = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((es) => {
        visible = es[0].isIntersecting;
      });
      io.observe(hc);
    }

    let timer = 0;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!ready) return;
        sizeHero();
        buildTargets();
        if (reduce) {
          born = -1e7;
          frame(0);
        }
      }, 150);
    };
    window.addEventListener('resize', onResize);

    const fontLoad = document.fonts && document.fonts.load
      ? document.fonts.load(`400 100px ${family}`, CFG.name).catch(() => {})
      : Promise.resolve();
    const fontWait = new Promise((r) => setTimeout(r, 1800));
    Promise.race([fontLoad, fontWait]).then(() => {
      if (cancelled) return;
      ready = true;
      sizeHero();
      buildTargets();
      if (reduce) {
        born = -1e7;
        frame(0);
      } else {
        raf = requestAnimationFrame(loop);
      }
    });

    sizeHero();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      if (io) io.disconnect();
      window.removeEventListener('resize', onResize);
      hc.removeEventListener('pointermove', onMove);
      hc.removeEventListener('pointerleave', onLeave);
      hc.removeEventListener('pointerup', onUp);
      hc.removeEventListener('pointerdown', onDown);
    };
  }, []);

  const dateLine =
    phase === 'day' ? '10 November · Happy birthday' : '10 November 2026 · Scorpio season';
  const lede =
  phase === 'day'
    ? 'Happy birthday, Lipsy. I hope today is as bright as you are.'
    : phase === 'after'
    ? 'I hope it was a lovely one.'
    : 'A small sky, built for you.';
  const hint = phase === 'day' ? 'Touch the name, then scroll down' : 'Touch the name';
  const show = (v) => (left ? v : '--');

  return (
    <header className="hero">
      <p className="mono">{dateLine}</p>
      <h1 className="sr" ref={h1Ref}>
        Happy birthday, {CFG.name}
      </h1>
      <div className="stage">
        <canvas ref={canvasRef} className="nameCanvas" aria-hidden="true" />
      </div>
      <p className="lede">{lede}</p>
      {phase !== 'after' && <p className="mono hint">{hint}</p>}
      {phase === 'before' && (
        <>
          <div className="count" role="timer" aria-live="off">
            <div className="cell"><span className="num">{show(left && left.d)}</span><span className="lab">days</span></div>
            <div className="cell"><span className="num">{show(left && pad(left.h))}</span><span className="lab">hours</span></div>
            <div className="cell"><span className="num">{show(left && pad(left.m))}</span><span className="lab">min</span></div>
            <div className="cell"><span className="num">{show(left && pad(left.s))}</span><span className="lab">sec</span></div>
          </div>
          <p className="mono until">until your birthday</p>
        </>
      )}
    </header>
  );
}
