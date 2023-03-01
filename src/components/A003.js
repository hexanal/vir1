import { useCallback, useState, useEffect } from 'react';
import { useControls, button }  from 'leva';

import usePointer from '../hooks/usePointer.js';
import useMotion from '../hooks/useMotion.js';
import useKeys from '../hooks/useKeys.js';
import useRaf from '../hooks/useRaf.js';

import Logger from './Logger';
import Graph from './Graph';

export default function A003(props) {
  const [things, setThings] = useState([
    { x: 50, y: 50, },
  ]);

  const clearThings = useCallback(() => {
    setThings([]);
  }, [setThings]);

  const {
    MASS,
  } = useControls({
    MASS: {
      value: 3,
      min: 1,
      max: 100,
      step: 0.1,
    },
    CLEAR_POINTS: button(clearThings),
  });

  const { keys } = useKeys();
  const { pointers, mouse } = usePointer({
    origin: [
      window.innerWidth / 2,
      window.innerHeight / 2
    ]
  });
  const { position: mousePosition } = mouse || {};
  const [x, y] = mousePosition || [];
  const { t, dt, elapsed } = useRaf();
  const { velocity, kinetic } = useMotion({ t, dt, position: [x, y], mass: MASS });
  const [vx, vy] = velocity || [];
  const [kx, ky] = kinetic || [];
  const { position: currentPosition } = pointers[0] || {};

  const onPointerMove = useCallback(() => {
    const [currentX, currentY] = currentPosition || [];

    if (currentX && currentY) {
      setThings(item => {
        item.push({
          x: 50 + (currentX / window.innerWidth * 100),
          y: 50 + (currentY / window.innerHeight * 100),
          kx: vx > 0 ? kx : -kx,
          ky: vy > 0 ? ky : -ky,
        });
        return item;
      });
    }
  }, [currentPosition, vx, vy, kx, ky]);

  // useEffect( () => {
  //   if (keys.includes('a')) {
  //   }
  //   if (keys.includes('s')) {
  //   }
  // }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        cursor: 'crosshair'
      }}
      onPointerMove={onPointerMove}
    >
      <Logger use={{
        numberOfPoints: things.length
      }} />

      <Graph>
        {things.map(({x, y, kx, ky}, i) => {
          return (
            <g
              key={`${x}-${y}-${i}`}
              style={{
                transformOrigin: `50% 50%`
              }}
            >
              <circle
                cx={x}
                cy={y}
                r={0.25}
                fill="rgb(255 0 255 / 1)"
                stroke="none"
              />
              <path
                d={`
                  M ${x},${y}
                  L ${x + kx},${y + ky}
                `}
                fill="none"
                stroke="rgb(255 255 0 / 1)"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          );
        })}
      </Graph>
    </div>
  );
};
