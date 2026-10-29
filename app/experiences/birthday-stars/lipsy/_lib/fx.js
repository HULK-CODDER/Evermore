// Confetti engine. The <Confetti /> component hands it a full-screen canvas;
// any component can then call burst(x, y) with screen coordinates.

let canvas = null;
let ctx = null;
let FW = 0;
let FH = 0;
let bits = [];
let running = false;

const COLORS = ['#ff8aa1', '#ffd37a', '#eeebff', '#b9a6ff', '#ffb3c1'];

export function attachFx(c) {
  canvas = c;
  ctx = c.getContext('2d');
  resizeFx();
}

export function detachFx() {
  canvas = null;
  ctx = null;
  bits = [];
}

export function resizeFx() {
  if (!canvas || !ctx) return;
  const d = Math.min(2, window.devicePixelRatio || 1);
  FW = window.innerWidth;
  FH = window.innerHeight;
  canvas.width = FW * d;
  canvas.height = FH * d;
  ctx.setTransform(d, 0, 0, d, 0, 0);
}

export function burst(x, y, n = 90) {
  if (!ctx) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.7;
    const sp = 4 + Math.random() * 9;
    bits.push({
      x,
      y,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp,
      w: 4 + Math.random() * 5,
      h: 6 + Math.random() * 8,
      r: Math.random() * 6,
      vr: (Math.random() - 0.5) * 0.4,
      c: COLORS[(Math.random() * COLORS.length) | 0],
      life: 0,
      max: 110 + Math.random() * 90,
    });
  }
  if (!running) {
    running = true;
    requestAnimationFrame(loop);
  }
}

function loop() {
  if (!ctx) {
    running = false;
    return;
  }
  ctx.clearRect(0, 0, FW, FH);
  const keep = [];
  for (const b of bits) {
    b.vy += 0.22;
    b.vx *= 0.99;
    b.x += b.vx;
    b.y += b.vy;
    b.r += b.vr;
    b.life++;
    if (b.life < b.max && b.y < FH + 30) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - b.life / b.max);
      ctx.translate(b.x, b.y);
      ctx.rotate(b.r);
      ctx.fillStyle = b.c;
      ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
      ctx.restore();
      keep.push(b);
    }
  }
  bits = keep;
  if (bits.length) {
    requestAnimationFrame(loop);
  } else {
    running = false;
    ctx.clearRect(0, 0, FW, FH);
  }
}
