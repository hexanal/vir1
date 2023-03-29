import { useRef, useState, useEffect } from 'react';

export default function useAnimationFrame(callback, deps = []) {
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const [frameCount, setFrameCount] = useState(0);

  const animate = (time) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      const frameNumber = frameCount + 1;
      callback({
        t: time,
        dt: deltaTime,
        frame: frameNumber
      });
      setFrameCount(frameNumber);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [callback, ...deps]);
}

