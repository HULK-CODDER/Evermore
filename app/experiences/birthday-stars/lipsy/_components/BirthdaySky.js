'use client';

import { useEffect, useState } from 'react';
import { CFG, STORAGE_KEY } from '../_lib/config';
import SkyBackground from './SkyBackground';
import Confetti from './Confetti';
import SoundToggle from './SoundToggle';
import Hero from './Hero';
import StarMap from './StarMap';
import Candle from './Candle';
import Letter from './Letter';

export default function BirthdaySky() {
  // Which of the nine stars are lit. Shared by the map and the letter.
  const [lit, setLit] = useState(() => new Set());

  // Remember her progress on this phone.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (Array.isArray(saved)) {
        setLit(new Set(saved.filter((n) => Number.isInteger(n) && n >= 0 && n < 9)));
      }
    } catch {}
  }, []);

  // Lights star i. Returns true when this tap completed all nine.
  const light = (i) => {
    const next = new Set(lit);
    const fresh = !next.has(i);
    next.add(i);
    setLit(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    } catch {}
    return fresh && next.size === 9;
  };

  return (
    <>
      <SkyBackground />
      <Confetti />
      <SoundToggle />
      <main className="main">
        <Hero />
        <StarMap lit={lit} light={light} />
        <Candle />
        <Letter count={lit.size} />
        <footer className="foot">
          <p className="mono">Made for {CFG.name} · 30 October 2026</p>
        </footer>
      </main>
    </>
  );
}
