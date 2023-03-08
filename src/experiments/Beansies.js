import { useCallback, useState, useEffect } from 'react';
import usePointer from '../hooks/usePointer.js';
import useMotion from '../hooks/useMotion.js';
import useKeys from '../hooks/useKeys.js';
import useRaf from '../hooks/useRaf.js';
import { useControls }  from 'leva';

import Logger from '../components/viz/Logger';
import Graph from '../components/viz/Graph';

/*
  MoveTo: M, m
  LineTo: L, l, H, h, V, v
  Cubic Bézier Curve: C, c, S, s
  Quadratic Bézier Curve: Q, q, T, t
  Elliptical Arc Curve: A, a
  ClosePath: Z, z
*/

export default function Beansies(props) {
  const { t, dt, elapsed } = useRaf();

  const { keys } = useKeys();
  const { pointers, mouse } = usePointer();
  const { position: mousePosition } = mouse || {};
  const [x, y] = mousePosition || [];

  const { velocity, kinetic } = useMotion({
    t, dt, position: mousePosition, mass: 1000
  });
  const [vx, vy] = velocity || [];
  const [kEx, kEy] = kinetic || [];

  const [ballPosition, setBallPosition] = useState([50, 50]);
  const [bX, bY] = ballPosition || [];

  useEffect( () => {
    
  }, [t]);

  const onHit = useCallback( e => {
    console.log([vx, vy]);
  }, [vx, vy]);

  return (
    <div
      className="cool-beans"
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
        t,
        dt,
        elapsed,
        elapsedYay: Math.floor(elapsed / 100) % 100,
        vx, vy,
        kEx, kEy
      }} />

      <Graph>
        <circle
          vectorEffect="non-scaling-stroke"
          cx={bX}
          cy={bY}
          r="5"
          fill="transparent"
          stroke="rgb(0 0 0 /1)"
          onPointerEnter={onHit}
        />
      </Graph>
    </div>
  );
};
