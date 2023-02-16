import { useState, useCallback, useEffect } from 'react';

export default function useMotion({
  t,
  dt,
  position,
  mass = 1,
}) {
  const [x, y] = position || [];
  const [t0, setT0] = useState(t);
  const [position0, setPosition0] = useState([x, y]);
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [vx, setVx] = useState(0);
  const [vy, setVy] = useState(0);
  const [kEx, setKEx] = useState(0);
  const [kEy, setKEy] = useState(0);

  useEffect(() => {
    const [x0, y0] = position0 || [];

    setDx(x && x0 ? x - x0 : 0);
    setDy(y && y0 ? y - y0 : 0);

    setT0(t);

    if (x && y) {
      setPosition0([x, y]);
    }
  }, [x, y, setPosition0, setT0]);

  useEffect(() => {
    if (dt === 0) return;

    setVx(dx/dt);
    setVy(dy/dt);
  }, [dx, dy]);

  useEffect(() => {
    setKEx(mass * vx * vx);
    setKEy(mass * vy * vy);
  }, [vx, vy]);

  return {
    velocity: [vx, vy],
    kinetic: [kEx, kEy],
  };
}

