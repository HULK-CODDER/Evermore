'use client';

import { useEffect, useRef } from 'react';
import { attachFx, detachFx, resizeFx } from '../_lib/fx';

export default function Confetti() {
  const ref = useRef(null);

  useEffect(() => {
    attachFx(ref.current);
    const onResize = () => resizeFx();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      detachFx();
    };
  }, []);

  return <canvas ref={ref} className="fx" aria-hidden="true" />;
}
