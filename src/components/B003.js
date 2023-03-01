import { v4 as uuidv4 } from 'uuid';
import { useCallback, useState, useEffect, useMemo } from 'react';
import { useControls, button }  from 'leva';

import usePointer from '../hooks/usePointer.js';
import useMotion from '../hooks/useMotion.js';
import useKeys from '../hooks/useKeys.js';
import useRaf from '../hooks/useRaf.js';

import Logger from './Logger';
import Graph from './Graph';

function norm(value = 0, step = 0.001) {
  return {
    min: -1,
    max: 1,
    value,
    step,
  }
}

export default function B003(props) {
  const {
    POINTS,
    THETA,
    ALPHA,
    BETA,
    GAMMA,
    EPSILON,
    SCALE,
    ORIGIN,
  } = useControls({
    ORIGIN: [50, 50],
    POINTS: {
      value: 1,
      min: 0,
      max: 255,
      step: 1,
    },
    ALPHA: norm(),
    BETA: norm(),
    GAMMA: norm(),
    EPSILON: norm(),
    THETA: norm(),
    SCALE: {
      min: 0.1,
      max: 100,
      value: 1,
      step: 0.1,
    }
  });

  // const { t, dt, elapsed } = useRaf();

  const { pointers, mouse, active } = usePointer({
    origin: [window.innerWidth / 2, window.innerHeight / 2]
  });
  const { position: mousePosition } = mouse || {};
  const [x, y] = mousePosition || [];

  const d = useMemo( () => {
    const [originX, originY] = ORIGIN;
    let str = `M ${originX},${originY}`;

    for (let i = 0; i <= POINTS; i++) {
      str += `
        L ${originX + i/POINTS*100},${originY - i/POINTS*100 * ALPHA}
      `;
    }

    return str;
  }, [POINTS, THETA, ALPHA, BETA, GAMMA, EPSILON, ORIGIN]);

  function loga(
    n,
    {
      freq = 1,
      amplitude = 1,
      offset = 0,
      time = 0
    } = {},
    t
  ) {
    return Math.log(n + freq) * amplitude + offset;
  }

  const fnX = useCallback( n => {
    const [originX, originY] = ORIGIN;
    const reset = n => originX + n;
    const normalized = n => n * (100 / POINTS);
    const lx = reset(normalized(n));

    return lx;
  }, [POINTS, SCALE, THETA, ALPHA, BETA, GAMMA, EPSILON, ORIGIN]);

  const fnY = useCallback( n => {
    const [originX, originY] = ORIGIN;

    const reset = n => originY - n;
    const normalized = n => n * (100 / POINTS * SCALE);

    const fucked = n => Math.sin(n * GAMMA * THETA);
    const curved = n => n * (ALPHA * n * BETA);
    const foo = n => n + Math.cos(n * THETA);
    const coolShit = n => n + Math.cos(n * THETA);


    // const ly = reset(normalized(loga(n, { freq: ALPHA, amplitude: BETA * 10 })));
    // const ly = reset(normalized(curved(n)));
    // const ly = reset(normalized(foo(fucked(n))));
    const ly = reset(normalized(coolShit(n)));

    return ly;
  }, [POINTS, SCALE, THETA, ALPHA, BETA, GAMMA, EPSILON, ORIGIN]);

  const d2 = useMemo( () => {
    const [originX, originY] = ORIGIN;
    let str = `M ${originX},${originY}`;

    for (let i = 0; i <= POINTS; i++) {
      const r = (i * ALPHA) + BETA * THETA;
      const lx = originX + r * Math.cos(i * THETA) * SCALE;
      const ly = originY + r * Math.sin(i * THETA) * SCALE;

      str += `
        L ${lx},${ly}
      `;
    }

    return str;
  }, [fnY, POINTS, ALPHA, BETA, THETA]);

  return (
    <Graph>
      {/* <path d={d} stroke="rgb(128 128 255 / 1)" fill="none" vectorEffect="non-scaling-stroke" /> */}
      <path d={d2} stroke="rgb(255 32 64 / 1)" fill="none" vectorEffect="non-scaling-stroke" />
    </Graph>
  );
};
