import { useCallback, useState, useEffect, useRef } from 'react';
import { useControls, button } from 'leva';
import useRaf from '../hooks/useRaf';
import useKeys from '../hooks/useKeys';
import useGamepads from '../hooks/useGamepads';
import useFart from '../hooks/useFart';
import usePointer from '../hooks/usePointer';
import Graph from './Graph';
import BiAxialScanner from './BiAxialScanner';
import Scanner from './Scanner';

export default function DanceMofo(props) {
  const { pointers, mouse } = usePointer({
    origin: [
      window.innerWidth / 2,
      window.innerHeight / 2,
    ],
    max: [
      window.innerWidth / 2,
      window.innerHeight / 2,
    ]
  });
  const particles = useRef([]);

  const { position, ratio, distanceRatioFromCenter } = pointers[0] || {};
  const [px, py] = position || [];
  const [rx, ry] = ratio || [];

  const vec = useRef([0, 0]);
  const [x, y] = vec.current;

  const { keys } = useKeys();

  useRaf( ({t, dt}) => {
    if (!px || !py || !rx || !ry) return;

    // const newX = px / window.innerWidth * 100 + 50;
    // const newY = py / window.innerHeight * 100 + 50;
    // const newX = rx / window.innerWidth * 100 + 50;
    // const newY = ry / window.innerHeight * 100 + 50;
    const newX = rx * 100 + 50;
    const newY = ry * 100 + 50;
    vec.current[0] = newX;
    vec.current[1] = newY;
    particles.current.push([newX, newY]);
  });

  useEffect(() => {
    if (keys.includes('w')) {
      particles.current = [];
    }
  }, [keys]);

  return (
    <div>
      <div
        style={{
          zIndex: 3,
          position: 'absolute',
          top: '1rem',
          left: '1rem',
        }}
      >
        <BiAxialScanner
          x={rx}
          y={ry}
          history={32}
        />
        <BiAxialScanner
          x={vec.current[0]}
          y={vec.current[1]}
          history={32}
        />
      </div>
      <Graph>
        <text
          x={51}
          y={2}
          stroke="none"
          style={{font: '1px monospace'}}
        >
          experiment: sploshes
        </text>

        {particles.current.map(([x,y], i) => {
          return (
            <circle
              key={`${x}-${i}`}
              cx={x}
              cy={y}
              r={0.5}
              fill={`rgb(0 0 0 / 1)`}
              stroke={`none`}
            />
          );
        })}

      </Graph>
    </div>
  );
};

