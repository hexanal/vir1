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

export default function B006(props) {
  const {
    POINTS,
    ALPHA,
    K,
    THETA,
    TIMESCALE,
    ORIGIN,
    ORIGIN_WOBBLE,
    GAMMA
  } = useControls({
    ORIGIN: [50, 50],
    ORIGIN_WOBBLE: {
      min: -1,
      max: 1,
      value: 0.5,
      step: 0.01,
    },
    POINTS: {
      value: 128,
      min: 0,
      max: 1024,
      step: 1,
    },
    ALPHA: {
      min: 0.001,
      max: 5,
      value: 0.2,
      step: 0.001,
    },
    K: {
      min: 0.001,
      max: 1.5,
      value: 0.25,
      step: 0.001,
    },
    THETA: {
      min: 0.0001,
      max: 0.5,
      value: 0.25,
      step: 0.0001,
    },
    GAMMA: {
      min: 0,
      max: 100,
      value: 1,
      step: 1,
    },
    TIMESCALE: {
      min: -5,
      max: 5,
      value: -0.5,
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
      const originWobbleX = Math.sin(t * 0.005 * TIMESCALE) * i * ORIGIN_WOBBLE;
      const originWobbleY = Math.cos(t * 0.005 * TIMESCALE) * i * ORIGIN_WOBBLE;
      const lx = (originWobbleX + originX) - ALPHA * Math.E ** (K * i * THETA) * Math.cos(i * THETA + angleProgress);
      const ly = (originWobbleY + originY) - ALPHA * Math.E ** (K * i * THETA) * Math.sin(i * THETA + angleProgress);

      str += `
        L ${lx},${ly}
      `;
    }

    return str;
  }, [POINTS, ORIGIN, ALPHA, K, THETA, TIMESCALE, ORIGIN_WOBBLE, GAMMA]);

  return (
    <Graph withoutLines>
      <path d={d(t)} stroke="rgb(255 128 128 / 1)" fill="none" vectorEffect="non-scaling-stroke" />
    </Graph>
  );
};
