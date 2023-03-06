import { useCallback, useState, useEffect, useRef } from 'react';

export default function useRaf(fn = false) {
  const [t, setT] = useState(Date.now());
  const t0 = useRef(Date.now());
  const dt = useRef(0);
  const elapsed = useRef(0);
  const raf = useRef(null);

  const onRaf = useCallback(time => {
    const t1 = Date.now();
    const delta = t1 - t.current;

    setT(t1);
    dt.current = delta;
    elapsed.current = t1 - t0;

    if (typeof fn === 'function') {
      fn({
        t: t1,
        t0: t0.current,
        dt: dt.current,
        elapsed: elapsed.current,
      });
    }

    raf.current = window.requestAnimationFrame(onRaf);
  // }, [t, t0, setT, setDeltaT, setElapsed]);
  }, [t, fn]);

  useEffect(() => {
    raf.current = window.requestAnimationFrame(onRaf);

    return () => {
      window.cancelAnimationFrame(raf.current);
    };
  }, [onRaf]);

  return {
    t,
    t0: t0.current,
    dt: dt.current,
    elapsed: elapsed.current,
  };
}

