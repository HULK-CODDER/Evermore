'use client';

import { useEffect, useRef } from 'react';

// Fixed twinkling star field behind the whole page, with a slow parallax on
// scroll and an occasional shooting star.
export default function SkyBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rand = (a, b) => a + Math.random() * (b - a);
    let W = 0;
    let H = 0;
    let stars = [];
    let shoot = null;
    let nextShoot = 4000;
    let raf = 0;
    let last = 0;

    const size = () => {
      const d = Math.min(2, window.devicePixelRatio || 1);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * d;
      canvas.height = H * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
      const n = Math.min(280, Math.round((W * H) / 6500));
      stars = [];
      for (let i = 0; i < n; i++) {
        let z = Math.random();
        z = 0.2 + z * z * 0.8;
        const r = Math.random();
        stars.push({
          x: Math.random(),
          y: Math.random(),
          z,
          ph: rand(0, 6.28),
          sp: rand(0.0006, 0.0022),
          c: r < 0.16 ? '255,211,122' : r < 0.3 ? '255,138,161' : '238,235,255',
        });
      }
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);
      const sc = reduce ? 0 : window.scrollY || 0;
      for (const s of stars) {
        const y = (((s.y * H - sc * 0.06 * s.z) % H) + H) % H;
        let a = reduce ? 0.7 : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph));
        a *= 0.4 + 0.6 * s.z;
        ctx.fillStyle = `rgba(${s.c},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x * W, y, s.z * 1.3, 0, 6.2832);
        ctx.fill();
      }
      if (!reduce) {
        if (!shoot && t > nextShoot) {
          shoot = { x: rand(W * 0.4, W), y: rand(0, H * 0.35), vx: -rand(7, 11), vy: rand(3, 5), l: 1 };
        }
        if (shoot) {
          shoot.x += shoot.vx;
          shoot.y += shoot.vy;
          shoot.l -= 0.014;
          ctx.strokeStyle = `rgba(255,240,220,${Math.max(0, shoot.l * 0.8).toFixed(3)})`;
          ctx.lineWidth = 1.6;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(shoot.x, shoot.y);
          ctx.lineTo(shoot.x - shoot.vx * 7, shoot.y - shoot.vy * 7);
          ctx.stroke();
          if (shoot.l <= 0) {
            shoot = null;
            nextShoot = t + rand(7000, 14000);
          }
        }
      }
    };

    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      if (t - last > 32) {
        last = t;
        draw(t);
      }
    };

    size();
    if (reduce) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    let timer = 0;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        size();
        if (reduce) draw(0);
      }, 150);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={ref} className="sky" aria-hidden="true" />;
}
