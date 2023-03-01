import { useCallback, useState, useEffect, useRef } from 'react';
import useRaf from './useRaf';

function delta(n0, n) {
  return n0 - n
}

function accel(dn, dt) {
  return dn/dt;
}

function useForce(props) {
  const {
    n: startWith = 0,
    force = 0,
    mass = 1,
  } = props || {};
  const n0 = useRef(startWith);
  const n = useRef(startWith);
  const p = useRef(0);
  const d = useRef(0);
  const a = useRef(0);

  const { t, dt } = useRaf();

  useEffect(() => {
    const dn = force !== 0
      ? Math.sqrt(Math.abs(force) / mass) * dt * (force > 0 ? 1 : -1)
      : 0;

    p.current = p.current + dn;

    // console.log({force, dn, dt});
    // console.log({newD, newA, newP});

    // d.current = newD;
    // a.current = newA;
    // p.current = newP;
  }, [t, dt, n, force]);

  return {
    p: p.current,
  }
}

const BIG_G = 9.81;

export default function useFart(props) {
  const {
    x: startX = 0,
    y: startY = 0,
    z: startZ = 0,
    mass = 1,
    density = 1,
    force = [0, 0, 0],
  } = props || {};
  const [fx, fy, fz] = force;

  const { p: x } = useForce({n: startX, force: fx, mass});
  const { p: y } = useForce({n: startY, force: fy, mass});
  const { p: z } = useForce({n: startZ, force: fz, mass});

  return {
    p: [x, y, z],
    // previous: [x0.current, y0.current, z0.current],
    // position: [x.current, y.current, z.current],
    // delta: [dx, dy, dz],
    // acceleration: [ax, ay, az ],
  };

}

