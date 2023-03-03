import { useCallback, useState, useEffect, useRef } from 'react';
import useRaf from './useRaf';
import stepper from '../stepper';

function useForce(props) {
  const {
    n: startWith = 0,
    force = 0,
    mass = 1,
  } = props || {};
  const { t, dt } = useRaf();
  const n0 = useRef(startWith);
  const n = useRef(startWith);
  const eased = useRef(startWith);
  const velocity = useRef(0);

  useEffect(() => {
    const deltaFromForce = force !== 0
      ? Math.sqrt(Math.abs(force) / mass) * dt * (force > 0 ? 1 : -1)
      : 0;
    const next = n.current + deltaFromForce;
    const diff = n.current - n0.current;
    const [step, newVelocity] = stepper({
      target: next,
      current: n.current,
      velocity: velocity.current,
    });

    // console.table({diff});

    n0.current = n.current;
    n.current = next;
    // eased.current = step;
    eased.current = next;
  }, [t, dt, n, force, mass]);

  return [n.current, n0.current, eased.current];
}

const BIG_G = 9.81;

export default function useFart(props) {
  const {
    start = [0, 0, 0],
    mass = 1,
    density = 1,
    force = [0, 0, 0],
  } = props || {};
  const [sx, sy, sz] = start;
  const [fx, fy, fz] = force;

  const [x, x0, ex] = useForce({n: sx, force: fx, mass});
  const [y, y0, ey] = useForce({n: sy, force: fy, mass});
  const [z, z0, ez] = useForce({n: sz, force: fz, mass});

  return {
    position: [x, y, z],
    eased: [ex, ey, ez],
  };

}

