import { useCallback, useState, useEffect, useRef } from 'react';
import { useControls, button } from 'leva';

import useRaf from '../hooks/useRaf';
import useKeys from '../hooks/useKeys';
import useGamepads from '../hooks/useGamepads';
import useFart from '../hooks/useFart';
import usePointer from '../hooks/usePointer';

import BiAxialScanner from '../components/viz/BiAxialScanner';
import Scanner from '../components/viz/Scanner';

export default function TheCanvas(props) {
  const {
    X,
    Y
  } = useControls({
    X: {
      value: 0,
      min: 0,
      max: 100,
      step: 1,
    },
    Y: {
      value: 0,
      min: 0,
      max: 100,
      step: 1,
    },
  });
  const ref = useRef(null);
  const { pointers, mouse } = usePointer();
  const { position, ratio, distanceRatioFromCenter } = pointers[0] || {};
  const [px, py] = position || [];
  const [rx, ry] = ratio || [];

  // console.log(ref.current);

  // const vec = useRef([0, 0]);
  // const [x, y] = vec.current;

  // const { keys } = useKeys();

  useRaf( ({t, dt}) => {
    const c = ref.current.getContext('2d');

    const w = ref.current.width;
    const h = ref.current.height;
    c.clearRect(0, 0, w, h);
    c.fillStyle = `hsl(${(1 + Math.sin(t * 0.001))/2 * 255} 50% 50%)`;
    c.fillRect(X, Y, 100, 100);
  });

  // useEffect(() => {
  //   if (keys.includes('w')) {
  //     particles.current = [];
  //   }
  // }, [keys]);

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
      </div>
      <canvas ref={ref} />
    </div>
  );
};

