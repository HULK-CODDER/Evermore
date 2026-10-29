'use client';

import { useEffect, useRef, useState } from 'react';
import { CFG } from '../_lib/config';
import { bell, chord } from '../_lib/audio';
import { burst } from '../_lib/fx';

export default function Letter({ count }) {
  const [open, setOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [shake, setShake] = useState(false);
  const cardRef = useRef(null);
  const left = 9 - count;

  const onClick = () => {
    if (left > 0) {
      setShake(true);
      bell(196, 0.08, 0.8);
      return;
    }
    if (open) return;
    setOpen(true);
    chord();
    setTimeout(() => setShowCard(true), 800);
  };

  useEffect(() => {
    if (!showCard) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (cardRef.current) cardRef.current.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    burst(window.innerWidth / 2, window.innerHeight * 0.5, 100);
  }, [showCard]);

  let note = '';
  if (left > 1) note = `${left} stars still dark. Light them all and it opens.`;
  else if (left === 1) note = 'One star still dark. Light it and the letter opens.';
  else if (!open) note = 'All nine are lit. Touch the seal.';

  const cls = 'envelope' + (left > 0 ? ' locked' : '') + (open ? ' open' : '') + (shake ? ' shake' : '');
  const reply = CFG.replyWhatsApp
    ? `https://wa.me/${CFG.replyWhatsApp}?text=${encodeURIComponent(CFG.replyText)}`
    : null;

  return (
    <section className="sect" id="letter" aria-labelledby="t-letter">
      <div className="head">
        <p className="mono">One more thing</p>
        <h2 id="t-letter">A letter, sealed.</h2>
      </div>
      <div className="env-wrap">
        <button
          type="button"
          className={cls}
          onClick={onClick}
          onAnimationEnd={() => setShake(false)}
          aria-describedby="lockNote"
        >
          <span className="back" />
          <span className="front" />
          <span className="flap" />
          <span className="seal">{left > 0 ? left : '✦'}</span>
        </button>
        <p className="lockNote" id="lockNote">{note}</p>
      </div>

      {showCard && (
        <article className="letter" ref={cardRef}>
          <h3 className="hi">Dear {CFG.name},</h3>
          {CFG.letter.map((t, i) => (
            <p key={i} style={{ '--i': i }}>{t}</p>
          ))}
          <p className="sign" style={{ '--i': CFG.letter.length }}>{CFG.sign}</p>
          {reply && (
            <div className="reply">
              <a className="btn" href={reply} target="_blank" rel="noreferrer">Say thanks on WhatsApp</a>
            </div>
          )}
        </article>
      )}
    </section>
  );
}
