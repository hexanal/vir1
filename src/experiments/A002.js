import { useState, useEffect } from 'react';
import usePointer from '../hooks/usePointer.js';
import useKeys from '../hooks/useKeys.js';
import useRaf from '../hooks/useRaf.js';
import { useControls }  from 'leva';

import Logger from '../components/viz/Logger';
import Graph from '../components/viz/Graph';

function control(others = {}) {
  return {
    value: 0,
    min: -100,
    max: 100,
    step: 1,
    ...others
  };
}

export default function A002(props) {
  const {
    control1,
    control2,
    DANGLE,
  } = useControls({
    control1: [0, 0],
    control2: [0, 0],
    DANGLE: {
      value: 1,
      min: 0,
      max: 100,
      step: 0.5,
    },
  });
  const [x1, y1] = control1 || [];
  const [x2, y2] = control2 || [];

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

  const [things, setThings] = useState([
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
    { x: 50, y: 50, },
  ]);

  useEffect( () => {
    if (keys.includes('a')) {
    }
    if (keys.includes('s')) {
    }
  }, []);

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
      {/*
      <Logger use={{
      }} />
      */}

      <Graph>
        {things.map(({x, y}, i) => {
          return (
            <g
              key={`${x}-${y}-${i}`}
              style={{
                transform: `rotate(${i * 10 + (t * 0.02 % 360)}deg)`,
                transformOrigin: `50% 50%`
              }}
            >
              <circle
                cx={x}
                cy={y}
                r={0.25}
                fill="rgb(0 0 255 / 1)"
                stroke="none"
              />
              <path
                d={`
                  M ${x},${y}
                  C ${x + x1 * 100},${y + y1 * 100} ${x + x2 * 100},${y + y2 * 100} ${x},${y + DANGLE}
                `}
                fill="none"
                stroke="rgb(0 0 255 / 1)"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          );
        })}
      </Graph>
    </div>
  );
};
