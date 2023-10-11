import { useRef, useEffect } from 'react';

export default function useStepper(props) {
  const {coords, t} = props || {};
  const velocityRef = useRef(new Array(coords.length).fill(0));
  const accelerationRef = useRef(new Array(coords.length).fill(0));
  const prevCoordsRef = useRef(coords);
  const prevTimestampRef = useRef(t);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const prevCoords = prevCoordsRef.current;
      const prevTimestamp = prevTimestampRef.current;

      const dt = (t - prevTimestamp) / 1000;

      const newVelocity = prevCoords.map((coord, index) => {
        const prevCoord = prevCoords[index];
        const velocity = (coord - prevCoord) / dt;
        return velocity;
      });

      const newAcceleration = newVelocity.map((velocity, index) => {
        const prevVelocity = velocityRef.current[index];
        const acceleration = (velocity - prevVelocity) / dt;
        return acceleration;
      });

      velocityRef.current = newVelocity;
      accelerationRef.current = newAcceleration;

      prevCoordsRef.current = coords;
      prevTimestampRef.current = t;
    }, 1000 / 60);

    return () => {
      clearInterval(intervalId);
    };
  }, [coords, t]);

  return { velocity: velocityRef.current, acceleration: accelerationRef.current };
}

