import { useEffect, useRef } from "react";
import useRaf from "../hooks/useRaf";

const evv = [
  {
    id: 'yeah',
    start: 1000,
    end: 2000,
    fn: (progress) => {
      return progress * 5;
    }
  },
  {
    id: 'no',
    start: 3000,
    end: 4000,
    fn: (progress) => {
      return (1 - progress) * 5;
    }
  },
];

function Timing1(props = {}) {
  const count = useRef(0);

  const eventQueue = useRef([...evv].sort((a, b) => a.start - b.end));
  const activeEvents = useRef([]);
  const { t, t0, elapsed } = useRaf();

  // const yo = useCallback((tStart, tNow, tEnd) => {
  //   console.log('yeah');
  // }, [t]);

  useEffect( () => {
    // const currentTime = performance.now();

    activeEvents.current = activeEvents.current.filter(event => event.end > t);

    while (eventQueue.current.length > 0 && eventQueue.current[0].start <= t) {
      const event = eventQueue.current.shift();
      activeEvents.current.push(event);
    }

    console.log( activeEvents.current );

    activeEvents.current.forEach(event => {
      const progress = (t - event.start) / (event.end - event.start);
      console.log(event.fn(progress));
    });
  }, [t, elapsed]);

  return <div>
    <div
      style={{
      }}
    >
      <pre>t: {t}</pre>
      <pre>t0: {t0}</pre>
      <pre>elapsed: {elapsed}</pre>
    </div>
  </div>
}

export default Timing1;

