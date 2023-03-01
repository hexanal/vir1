import { useCallback, useState, useEffect } from 'react';
import { useControls, button }  from 'leva';

import usePointer from '../hooks/usePointer.js';
import useMotion from '../hooks/useMotion.js';
import useKeys from '../hooks/useKeys.js';
import useRaf from '../hooks/useRaf.js';

import Logger from './Logger';
import Graph from './Graph';

export default function A004(props) {
  const {
    MASS,
    POINTER_MASS,
  } = useControls({
    MASS: {
      value: 3,
      min: 1,
      max: 100,
      step: 0.1,
    },
    POINTER_MASS: {
      value: 3,
      min: 1,
      max: 100,
      step: 0.1,
    },
  });

  const { t, dt, elapsed } = useRaf();

  const { pointers, mouse } = usePointer({
    origin: [window.innerWidth / 2, window.innerHeight / 2]
  });
  const { position: mousePosition } = mouse || {};
  const [x, y] = mousePosition || [];
  const { velocity, kinetic } = useMotion({ t, dt, position: [x, y], mass: POINTER_MASS });
  const [vx, vy] = velocity || [];
  const [kx, ky] = kinetic || [];
  const { position: currentPosition } = pointers[0] || {};

  const [ballPosition, setBallPosition] = useState([50, 25])
  const [ballX, ballY] = ballPosition || [];
  const [ballVelocity, setBallVelocity] = useState([0, 0]);
  const [ballVx, ballVy] = ballVelocity || [];

  const { keys } = useKeys();

  // F = ma
  // Fx = MASS * ax
  // Fy = MASS * ay etc.
  // m = a / F ?
  // a = F / m
  // -> dvx/dt = Fx / MASS
  // -> dvx/dt = Fx / MASS
  // -> dvx = dt * (Fx / MASS)

  useEffect( () => {
    setBallPosition(([x,y]) => [x + ballVx, y + ballVy]);
  }, [t, ballVx, ballVy, setBallPosition]);

  const onPointerEnter = useCallback(() => {
    setBallVelocity([
      vx > 0 ? kx : -kx,
      vy > 0 ? ky : -ky,
  ]);
  }, [vx, vy, kx, ky, setBallVelocity]);

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
    >
      <Logger use={{
      }} />

      <Graph>
        <g
          style={{
            transformOrigin: `50% 50%`
          }}
          onPointerEnter={onPointerEnter}
        >
          <circle
            cx={ballX}
            cy={ballY}
            r={5}
            fill="rgb(255 0 0 / 1)"
            stroke="none"
          />
        </g>
      </Graph>
    </div>
  );
};
