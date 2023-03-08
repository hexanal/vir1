import { useState, useEffect } from 'react';
import usePointer from '../hooks/usePointer.js';
import useKeys from '../hooks/useKeys.js';
import useRaf from '../hooks/useRaf.js';
import { useControls }  from 'leva';

import Graph from '../components/viz/Graph';

function ctg(x) { return 1 / Math.tan(x); }

function saw(n, L = 1) {
  return 0.5 - Math.atan(
    ctg(
      (Math.PI * n)
      / (2 * L)
    )
  );
}

/*
MoveTo: M, m
LineTo: L, l, H, h, V, v
Cubic Bézier Curve: C, c, S, s
Quadratic Bézier Curve: Q, q, T, t
Elliptical Arc Curve: A, a
ClosePath: Z, z

*/

export default function Cooler(props) {
  const { rX, rY, rX2, rY2 } = useControls({
    rX: {
      value: 50,
      min: 0,
      max: 100,
      step: 1,
    },
    rY: {
      value: 0,
      min: 0,
      max: 100,
      step: 1,
    },
    rX2: {
      value: 50,
      min: 0,
      max: 100,
      step: 1,
    },
    rY2: {
      value: 100,
      min: 0,
      max: 100,
      step: 1,
    },
  });

  const { keys } = useKeys();
  const { pointers, mouse } = usePointer();
  const { position: mousePosition } = mouse || {};
  const [x, y] = mousePosition || [];

  const [var1, setVar1] = useState(0);
  const [var2, setVar2] = useState(0);
  const [sawV, setSawV] = useState(0);
  const { t } = useRaf();

  const {
    tFactor,
    exponent,
    sawN,
    sawL,
    showCircle,
    showWaves,
  } = useControls({
    tFactor: {
      value: 5,
      min: 1,
      max: 10,
      step: 0.1,
    },
    exponent: 1,
    sawN: 1,
    sawL: 1,
    showCircle: false,
    showWaves: false,
  });

  useEffect( () => {
    const v1 = parseFloat(
      (Math.sin(t * tFactor * 0.001) ** exponent).toFixed(2));
    const v2 = parseFloat(Math.cos(t * tFactor * 0.001).toFixed(2));

    setVar1(v1);
    setVar2(v2);
    setSawV( saw(t * tFactor * 0.001, sawL) );
  }, [t, setVar1, setVar2, setSawV, tFactor, exponent, sawL]);


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
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
        }}
      >
        hey dickhead!
      </div>

      <Graph>
        {showCircle
          ? (
            <circle
              vectorEffect="non-scaling-stroke"
              cx="50"
              cy={50 + sawV * 10}
              r="1.5"
              fill="rbg(255 0 255 / 1)"
            />
          )
          : null}

        {showWaves
          ? [
            0,1,2,3,4,5,6,7,8,9,10,
            11,12,13,14,15,16,17,18,19,20
          ].map(n => (
            <path
              d={`
              M 0,50
              C ${rX},${rY + (var1*50) + n},${rX2},${rY2 + (var2*50) + n},100,50
              z
              `}
              style={{
                stroke: `rgb(0 0 0 / ${1 - (n * 0.05)})`,
                fill: 'transparent',
                vectorEffect: 'non-scaling-stroke',
              }}
            />
            )
          )
          : null}
      </Graph>
    </div>
  );
};
