import { v4 as uuidv4 } from 'uuid';
import { useCallback, useState, useEffect } from 'react';
import { useControls, button }  from 'leva';

import usePointer from '../hooks/usePointer.js';
import useMotion from '../hooks/useMotion.js';
import useKeys from '../hooks/useKeys.js';
import useRaf from '../hooks/useRaf.js';

import Logger from './Logger';
import Graph from './Graph';

export default function B002(props) {
  const {
    FREQ,
    AMPLITUDE,
  } = useControls({
    FREQ: {
      value: 1,
      min: 1,
      max: 10,
      step: 1,
    },
    AMPLITUDE: {
      value: 20,
      min: 1,
      max: 100,
      step: 1,
    },
  });

  // const { t, dt, elapsed } = useRaf();

  const { pointers, mouse } = usePointer({
    origin: [window.innerWidth / 2, window.innerHeight / 2]
  });
  const { position: mousePosition } = mouse || {};
  const [x, y] = mousePosition || [];
  const [pathPoints, setPathPoints] = useState([
    {
      id: uuidv4(),
      type: 'M',
      coords: [25, 75],
    },
    {
      id: uuidv4(),
      type: 'L',
      coords: [75, 10],
    },
  ]);
  const onKeys = useCallback(keys => {
    if ( keys.includes('a') ) {
      const coords = [
        50 + (x / window.innerWidth * 100),
        50 + (y / window.innerHeight * 100),
      ]
    }
  }, [x, y, setPathPoints]);

  useKeys({ onKeys });

  function withIntermediates(start, end, freq = 2, amplitude = 2) {
    const [x0,y0] = start || [];
    const [x1,y1] = end || [];
    const dx = x1 - x0;
    const dy = y1 - y0;
    const distance = Math.sqrt( dx ** 2 + dy ** 2 );
    const theta = Math.atan2(dy, dx);
    const angle = 180 - (theta * 180 / Math.PI);

    const side = Math.sqrt( (distance / freq) ** 2 + amplitude ** 2);
    const sideTheta = Math.atan2( amplitude, distance / freq);
    const anglePrime = 180 - (sideTheta * 180 / Math.PI);

    console.log({sideTheta, anglePrime});

    let interPoints = [];

    for (let i = 1; i < freq; i++) {
      const ratioX = (dx/freq) * i;
      const ratioY = (dy/freq) * i;
      const ix = x0 + ratioX;
      const iy = y0 + ratioY;
      const amp = i % 2 === 0 ? amplitude : -amplitude;

      const ix1 = ix + Math.cos(anglePrime) * amp;
      const iy1 = iy + Math.sin(anglePrime) * amp;

      interPoints.push([ix, iy, ix1, iy1]);
    }

    return interPoints;
  }

  return (
    <div>
      <Graph>
        <circle
          cx={50}
          cy={50}
          r={3}
          fill="rgb(150 150 150 / 0.5)"
          stroke="none"
        />
        {pathPoints.map(({ type, coords }, i) => {
            const { coords: prevPointCoords = null } = pathPoints[i - 1] || {};
            const inter = withIntermediates(prevPointCoords, coords, FREQ, AMPLITUDE);

            const intermediates = prevPointCoords !== null
              ? inter.map((p, i) =>  {
                const [ix, iy, ix1, iy1] = p || [];
                return (
                  <line x1={ix} x2={ix1} y1={iy} y2={iy1} vectorEffect="non-scaling-stroke" />
                );
              })
              : null;

            return intermediates;
        })}

        <path
          d={pathPoints.map(({ type, coords }, i) => {
            const finalType = i === 0 ? 'M' : type;
            const { coords: prevPointCoords = null } = pathPoints[i - 1] || {};
            const [px, py] = coords || [];
            const inter = withIntermediates(prevPointCoords, coords, FREQ, AMPLITUDE);

            const interPoints = prevPointCoords !== null
              ? inter.map((p, i) =>  {
                const [ix, iy, ix1, iy1] = p || [];
                return `
                  Q ${ix1},${iy1},${ix},${iy}
                `;
                // return `L ${ix},${iy}`;
              }).join(' ')
              : '';

            return `
              ${interPoints}
              ${finalType} ${px},${py}
            `
          }).join(' ') }
          stroke="rgb(128 128 255 / 1)"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </Graph>
    </div>
  );
};
