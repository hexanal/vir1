import { v4 as uuidv4 } from 'uuid';
import { useCallback, useState, useEffect, useMemo } from 'react';
import { useControls, button }  from 'leva';

import usePointer from '../hooks/usePointer.js';
import useMotion from '../hooks/useMotion.js';
import useKeys from '../hooks/useKeys.js';
import useRaf from '../hooks/useRaf.js';

import Graph from './Graph';
import Logger from './Logger';

function norm(value = 0, step = 0.001) {
  return {
    min: -1,
    max: 1,
    value,
    step,
  }
}

export default function C001(props) {
  const {
    multiplier = 1,
    color = 'rgb(255 0 0 / 1)',
  } = props || {};

  const {
    POINTS,
    ALPHA,
    BAMBOO,
    THETA,
    TIMESCALE,
    ORIGIN,
    WITH_LOG,
  } = useControls({
    ORIGIN: [50, 50],
    POINTS: {
      value: 256,
      min: 0,
      max: 1024,
      step: 1,
    },
    ALPHA: {
      min: 1,
      max: 100,
      value: 25,
      step: 1,
    },
    BAMBOO: {
      min: -100,
      max: 100,
      value: -50,
      step: 0.1,
    },
    // K: {
    //   min: 0.001,
    //   max: 1.5,
    //   value: 0.25,
    //   step: 0.001,
    // },
    THETA: {
      min: 1,
      max: 1000,
      value: 100,
      step: 1,
    },
    TIMESCALE: {
      min: -0.005,
      max: 0.005,
      value: 0.0075,
      step: 0.001,
    },
    WITH_LOG: true,
  });

  const { t, dt, elapsed } = useRaf();

  const { pointers, mouse, active } = usePointer({
    origin: [window.innerWidth / 2, window.innerHeight / 2]
  });
  const { position: mousePosition } = mouse || {};
  const [x, y] = mousePosition || [];

  const getCoords = useCallback( (i, timestep) => {
    const [originX, originY] = ORIGIN;
    const lx = originX + i;

    const timeWobbleTransform = ((ALPHA * multiplier) + (1 + Math.sin(timestep * TIMESCALE)) * THETA);

    const withoutInfinity = i + Number.EPSILON;
    const withFunc = (1/withoutInfinity);
    const withTransform = withFunc * timeWobbleTransform;
    const withOrigin = originY + withTransform;

    const ly = Math.min(1000, withOrigin);

    return [lx, ly];
  }, [ORIGIN, ALPHA, BAMBOO, THETA, TIMESCALE, multiplier]);

  const getD = useCallback( t => {
    const [originX, originY] = ORIGIN;
    let str = '';

    for (let i = BAMBOO; i <= POINTS; i++) {
      const [lx0, ly0] = getCoords(i - 1, (t - dt) );
      const [lx, ly] = getCoords(i, t);
      const changed = ly - ly0 >= 100;
      const type = i === BAMBOO || changed ? 'M' : 'L';

      str += `${type} ${lx},${ly}
`;
    }

    return str;
  }, [t, dt, POINTS, ORIGIN, ALPHA, BAMBOO]);

  const d = getD(t);

  return (
    <>

{WITH_LOG ? (
<pre style={{
  overflow: 'auto',
  position: 'absolute',
  top: 0,
  left: '0.5rem',
  fontSize: '0.65rem',
  height: '40%',
  padding: '0.5rem 1rem'
}}>
{d}
</pre>
): null}

      <Graph>
        <path d={d} stroke={color} fill="none" vectorEffect="non-scaling-stroke" />
      </Graph>
    </>
  );
};
