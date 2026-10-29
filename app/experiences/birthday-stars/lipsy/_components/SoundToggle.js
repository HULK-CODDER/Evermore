'use client';

import { useState } from 'react';
import { bell, setMuted } from '../_lib/audio';

export default function SoundToggle() {
  const [muted, setMutedState] = useState(false);

  const toggle = () => {
    const next = !muted;
    setMutedState(next);
    setMuted(next);
    if (!next) bell(523.25, 0.08, 1.2);
  };

  return (
    <button className="sound" type="button" aria-pressed={!muted} onClick={toggle}>
      {muted ? 'Sound off' : 'Sound on'}
    </button>
  );
}
