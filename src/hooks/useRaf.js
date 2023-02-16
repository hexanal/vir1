import { useCallback, useState, useEffect, useRef } from 'react';

export default function useRaf() {
  const [t, setT] = useState(Date.now());
  const [dt, setDeltaT] = useState(0);
  const raf = useRef(null);

  const onRaf = useCallback(time => {
    const t1 = Date.now();
    const delta = t1 - t;

    setT(t1);
    setDeltaT(delta);

    raf.current = window.requestAnimationFrame(onRaf);
  }, [t, setT, setDeltaT]);

  useEffect(() => {
    raf.current = window.requestAnimationFrame(onRaf);

    return () => {
      window.cancelAnimationFrame(raf.current);
    };
  }, [t]);

  return {
    t,
    dt
  };
}

