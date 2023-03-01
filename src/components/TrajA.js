import { useCallback, useState, useEffect, useRef } from 'react';
import { useControls, button } from 'leva';
import useRaf from '../hooks/useRaf';
import useKeys from '../hooks/useKeys';
import useFart from '../hooks/useFart';
import Graph from './Graph';

export default function TrajA(props) {
  const {
    COOL,
    FORCE,
    MASS
  } = useControls({
    COOL: true,
    MASS: {
      value: 1,
      min: 1,
      max: 2000,
      step: 1,
    },
    FORCE: {
      value: 0.05,
      min: -2,
      max: 2,
      step: 0.01,
    },
  });

  const [force, setForce] = useState([0, 0, 0]);
  const { keys } = useKeys();

  useEffect(() => {
    let fx = 0;
    let fy = 0;
    let fz = 0;

    if (keys.includes('w')) {
      fy = -FORCE;
    }
    if (keys.includes('a')) {
      fx = -FORCE;
    }
    if (keys.includes('s')) {
      fy = FORCE;
    }
    if (keys.includes('d')) {
      fx = FORCE;
    }

    setForce([fx, fy, fz]);
  }, [keys, FORCE, setForce]);

  const { p } = useFart({ force, mass: MASS });
  const [x, y, z] = p || [];

  return (
    <Graph>
      <text x={0} y={3} style={{fontSize: 2, stroke: 'none' }}>[{x}, {y}, {z}]</text>
      <circle
        cx={50 + x}
        cy={50 + y}
        r={5}
        fill="rgb(255 0 0 / 1)"
        stroke="none"
        style={{
          transform: `translateZ(${z}px)`
        }}
      />
    </Graph>
  );
};

//
//      <circle
//        cx={50 + ballX}
//        cy={50 + ballY}
//        r={5}
//        fill="rgb(255 0 0 / 1)"
//        stroke="none"
//      />
//      <circle
//        cx={50 + forceX}
//        cy={50 + forceY}
//        r={2}
//        fill="rgb(255 255 0 / 1)"
//        stroke="none"
//      />
