// Tiny Web Audio bell. Browsers only allow sound after a tap, so the context
// is created lazily the first time something calls bell().

let actx = null;
let muted = false;

export function setMuted(value) {
  muted = value;
}

function getCtx() {
  if (typeof window === 'undefined') return null;
  if (!actx) {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      actx = AC ? new AC() : null;
    } catch {
      actx = null;
    }
  }
  if (actx && actx.state === 'suspended') {
    try {
      actx.resume();
    } catch {}
  }
  return actx;
}

export function bell(freq, vol = 0.12, dur = 2.2) {
  if (muted) return;
  const a = getCtx();
  if (!a) return;
  const t = a.currentTime;
  const g = a.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  g.connect(a.destination);
  [
    [1, 1],
    [2.01, 0.35],
    [3.97, 0.12],
  ].forEach(([mult, level]) => {
    const o = a.createOscillator();
    const og = a.createGain();
    o.type = 'sine';
    o.frequency.value = freq * mult;
    og.gain.value = level;
    o.connect(og);
    og.connect(g);
    o.start(t);
    o.stop(t + dur + 0.1);
  });
}

export function chord() {
  [261.63, 329.63, 392.0, 523.25].forEach((f, i) => {
    setTimeout(() => bell(f, 0.07, 2.8), i * 110);
  });
}
