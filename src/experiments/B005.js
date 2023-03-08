import { v4 as uuidv4 } from 'uuid';
import { useCallback, useState, useEffect, useMemo } from 'react';
import { useControls, button }  from 'leva';

import usePointer from '../hooks/usePointer.js';
import useMotion from '../hooks/useMotion.js';
import useKeys from '../hooks/useKeys.js';
import useRaf from '../hooks/useRaf.js';

import Graph from '../components/viz/Graph';

function norm(value = 0, step = 0.001) {
  return {
    min: -1,
    max: 1,
    value,
    step,
  }
}

export default function B005(props) {
  const {
    POINTS,
    ALPHA,
    THETA,
    TIMESCALE,
    ORIGIN,
  } = useControls({
    ORIGIN: [50, 50],
    POINTS: {
      value: 1024,
      min: 0,
      max: 1024,
      step: 1,
    },
    ALPHA: {
      min: 0.01,
      max: 100,
      value: 8.38,
      step: 0.01,
    },
    THETA: {
      min: 0.001,
      max: 1.5,
      value: 0.15,
      step: 0.001,
    },
    TIMESCALE: {
      min: -5,
      max: 5,
      value: 1.5,
      step: 0.1,
    }
  });

  const { t, dt, elapsed } = useRaf();

  const { pointers, mouse, active } = usePointer({
    origin: [window.innerWidth / 2, window.innerHeight / 2]
  });
  const { position: mousePosition } = mouse || {};
  const [x, y] = mousePosition || [];

  const d = useCallback( t => {
    const [originX, originY] = ORIGIN;
    let str = `M ${originX},${originY}`;

    const angleWobble = (1 + Math.sin(t * 0.0005)) * 10;
    const angleProgress = t * 0.005 * TIMESCALE;

    for (let i = 0; i <= POINTS; i++) {
      const lx = originX - ALPHA * Math.sqrt(i * THETA) * Math.cos(i * THETA + angleProgress);
      const ly = originY - ALPHA * Math.sqrt(i * THETA) * Math.sin(i * THETA + angleProgress);

      str += `
        L ${lx},${ly}
      `;
    }

    return str;
  }, [POINTS, ORIGIN, ALPHA, THETA, TIMESCALE]);

  return (
    <Graph withoutLines>
      <path d={d(t)} stroke="rgb(128 64 255 / 1)" fill="none" strokeWidth={3} vectorEffect="non-scaling-stroke" />
    </Graph>
  );
};
