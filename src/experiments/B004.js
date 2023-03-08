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

export default function B004(props) {
  const {
    POINTS,
    ALPHA,
    BETA,
    THETA,
    TIMESCALE,
    ORIGIN,
  } = useControls({
    ORIGIN: [50, 50],
    POINTS: {
      value: 256,
      min: 0,
      max: 1024,
      step: 1,
    },
    ALPHA: {
      min: 0.001,
      max: 2,
      value: 0.2,
      step: 0.001,
    },
    BETA: {
      min: 1,
      max: 100,
      value: 1,
      step: 0.1,
    },
    THETA: {
      min: 0.01,
      max: 0.5,
      value: 0.15,
      step: 0.01,
    },
    TIMESCALE: {
      min: 0.1,
      max: 100,
      value: 1,
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
    const angleProgress = t * -0.005 * TIMESCALE;

    for (let i = 0; i <= POINTS; i++) {
      const r = (i * ALPHA) + BETA * THETA;
      const lx = originX + r * Math.cos(i * THETA + angleProgress);
      const ly = originY + r * Math.sin(i * THETA + angleProgress);

      str += `
        L ${lx},${ly}
      `;
    }

    return str;
  }, [POINTS, ORIGIN, ALPHA, BETA, THETA, TIMESCALE]);

  return (
    <Graph>
      <path d={d(t)} stroke="rgb(255 255 0 / 1)" fill="none" vectorEffect="non-scaling-stroke" />
    </Graph>
  );
};
