import { useState, useEffect } from 'react';
import usePointer from '../hooks/usePointer.js';
import useKeys from '../hooks/useKeys.js';
import useRaf from '../hooks/useRaf.js';
import { useControls }  from 'leva';

/*

MoveTo: M, m
LineTo: L, l, H, h, V, v
Cubic Bézier Curve: C, c, S, s
Quadratic Bézier Curve: Q, q, T, t
Elliptical Arc Curve: A, a
ClosePath: Z, z

*/

function fuckYou(n, mX, mY) {
  let d = '';

  for (let i = 0; i <= n; i++) {
    d += `
      M 0,0
      L 0,0
      C 0,${i * (mY * 0.1)},${i * (mX * 0.1)},0,100,100
      L 0,0
    `
  }

  d += `
    z
  `;

  return d;
}

function makeMe(n, mX, mY) {
  let c = [];

  for (let i = 0; i <= n; i++) {
    c.push({
      cx: i * 2,
      cy: i * (2 - (i * mX)),
      r: 2 * (n - i) * mY,
      pathLength: 10,
      dashArray: 0,
      dashOffset: 0,
      // dashArray: mX,
      // dashOffset: mY,
    });
  }

  return c;
}
// function makeMe(n, mX, mY) {
//   let c = [];

//   for (let i = 0; i <= n; i++) {
//     c.push({
//       cx: i * 2,
//       cy: (i * 2) * (i * 0.001 * mX),
//       r: 2,
//       pathLength: 10,
//       dashArray: 0,
//       dashOffset: 0,
//     });
//   }

//   return c;
// }

export default function CoolBeans(props) {
  const { position: woop } = useControls({ position: { x: 0, y: 0 }, });
  const { rotate } = useControls({ rotate: [0, 0], });
  const [rX, rY] = rotate || [];

  const { x: pX, y: pY } = woop || {};

  const [start, setStart] = useState(null);
  const { keys } = useKeys();
  const { pointers, mouse } = usePointer();
  const { position: mousePosition } = mouse || {};
  const [x, y] = mousePosition || [];

  const [var1, setVar1] = useState(0);
  const [var2, setVar2] = useState(0);
  const { t } = useRaf();

  useEffect( () => {
    const v1 = parseFloat(Math.sin(t * 0.004).toFixed(1));
    const v2 = parseFloat(Math.sin(t * 0.007).toFixed(1));

    setVar1(v1);
    setVar2(v2);
  }, [t, setVar1, setVar2]);

  useEffect( () => {
    const { position = null } = pointers[0] || {};
    setStart(position);
  }, [pointers, setStart]);

  const [startX = 0, startY = 0] = start || [];
  const mX = startX / window.innerWidth * 100;
  const mY = startY / window.innerHeight * 100;

  const circles = makeMe(200, pX, pX);

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
        <pre>x: {pX}</pre>
        <pre>y: {pY}</pre>
        <pre>var1: {var1}</pre>
        <pre>var2: {var2}</pre>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          width: '100%',
          height: '100%',
          stroke: 'rgb(0 0 0 / 1)',
          strokeWidth: '1px',
          transformStyle: 'preserve-3d',
          perspective: '1200px',
        }}
      >
        <line
          vectorEffect="non-scaling-stroke"
          x1="0"
          x2="100"
          y1="0"
          y2="100"
        />
        <mask
          id="cursorMask"
        >
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            fill="white"
          />
            <circle
              cx={mX}
              cy={mY}
              r="10"
              fill="black"
            />
        </mask>

        <circle
          cx={25 + var1}
          cy={75 + var2}
          r="3"
          stroke="rgb(0 0 0 / 1)"
          fill="rgb(255 0 255 / 1)"
          vectorEffect="non-scaling-stroke"
        />
        <circle
          cx={75 + var2}
          cy={75 + var1}
          r="3"
          stroke="rgb(0 0 0 / 1)"
          fill="rgb(0 255 255 / 1)"
          vectorEffect="non-scaling-stroke"
        />

        <g
          mask="url(#cursorMask)"
        >
          {circles.map(c => {
              const {
                cx,
                cy,
                r,
                pathLength,
                dashArray,
                dashOffset,
              } = c || {};

              return (
                <circle
                  key={`${cx}-${cy}`}
                  cx={cx}
                  cy={cy}
                  r={r}
                  pathLength={pathLength}
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                  transform={`rotate(${rX} 0 ${rY})`}
                  style={{
                    stroke: 'rgb(0 0 0 / 1)',
                    fill: 'transparent',
                    vectorEffect: 'non-scaling-stroke',
                  }}
                />
              );
          })}
        </g>


        <path
          d={fuckYou(10, var2 * 50, var1 * 50)}
          style={{
            stroke: 'rgb(0 0 0 / 1)',
            fill: 'transparent',
            vectorEffect: 'non-scaling-stroke',
          }}
        />
      </svg>
    </div>
  );
};
