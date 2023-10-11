import { v4 as uuidv4 } from 'uuid';
import { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { Leva, useControls, button }  from 'leva';

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

export default function Spire(props) {
  const {
    origin = [0.5, 0.5],
    color = `rgb(0 0 0 / 1)`,
    timeOffset = 0,
    noControls = false,
  } = props;

  const {
    POINTS,
    ALPHA,
    BETA,
    THETA,
    TIMESCALE,
  } = useControls({
    POINTS: {
      value: 64,
      min: 0,
      max: 1024,
      step: 1,
    },
    ALPHA: {
      min: 0,
      max: 10,
      value: 6,
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
    },
  });

  const ref = useRef(null);
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const { pointers, active } = usePointer({
    origin: [window.innerWidth / 2, window.innerHeight / 2]
  });
  const { position } = pointers || {};

  useRaf( ({t, dt, elapsed}) => {
    const c = ref.current.getContext('2d');

    const w = ref.current.width;
    const h = ref.current.height;
    c.clearRect(0, 0, w, h);

    const [originX, originY] = origin || [0.5, 0.5];

    const angleWobble = (1 + Math.sin((t + timeOffset) * 0.0005)) * 10;
    const angleProgress = (t + timeOffset) * -0.005 * TIMESCALE;


    for (let i = 0; i <= POINTS; i++) {
      const r = (i * ALPHA) + BETA * THETA;
      const lx = originX * w + r * Math.cos(i * THETA + angleProgress);
      const ly = originY * h + r * Math.sin(i * THETA + angleProgress);

      c.beginPath();
      c.fillStyle = `hsl(${(1 - i / POINTS) * 270} 50% 50% / ${1 - i / POINTS})`;
      c.arc(
        lx,
        ly,
        3,
        0,
        2 * Math.PI
      );
      c.fill();
      // c.lineTo(lx, ly);
    }

  }, []);

  return (
    <>
      <Leva
        hidden={noControls}
      />
      <canvas
        ref={ref}
        width={vw}
        height={vh}
        style={{
          position: 'fixed',
          zIndex: -1,
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
      />
    </>
  );
};
