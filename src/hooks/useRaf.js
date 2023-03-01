import { useCallback, useState, useEffect, useRef } from 'react';

export default function useRaf() {
  const [t0] = useState(Date.now());
  const [t, setT] = useState(Date.now());
  const [dt, setDeltaT] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const raf = useRef(null);

  const onRaf = useCallback(time => {
    const t1 = Date.now();
    const delta = t1 - t;

    setT(t1);
    setDeltaT(delta);
    setElapsed(t1 - t0);

    raf.current = window.requestAnimationFrame(onRaf);
  }, [t, t0, setT, setDeltaT, setElapsed]);

  useEffect(() => {
    raf.current = window.requestAnimationFrame(onRaf);

    return () => {
      window.cancelAnimationFrame(raf.current);
    };
  }, [t, onRaf]);

  return {
    t,
    t0,
    dt,
    elapsed,
  };
}

