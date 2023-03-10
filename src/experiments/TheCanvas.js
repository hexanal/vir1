import { useCallback, useState, useEffect, useRef } from 'react';
import { useControls, button } from 'leva';

import useRaf from '../hooks/useRaf';
import useKeys from '../hooks/useKeys';
import useGamepads from '../hooks/useGamepads';
import useFart from '../hooks/useFart';
import usePointer from '../hooks/usePointer';
import useFaderControl from '../hooks/useFaderControl';
import useToggleControl from '../hooks/useToggleControl';

function grid({
  cols,
  rows,
  processor = n => n
}) {
  let items = [];

  for (let i = 0; i <= rows; i++) {
    for(let j = 0; j <= cols; j++) {
      const coords = [i, j];
      items.push({
        coords,
        value: processor(coords)
      });
    }
  }

  return items;
}

function wave({ A, lambda, x, v, t, }) {
  const wa = A * Math.sin(t * lambda * v) + x;
  const wb = wa.toFixed(3);
  const wc = parseFloat(wb);

  return wc;
}

export default function TheCanvas(props) {
  const ref = useRef(null);
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const [ballSize, BallSizeControl] = useFaderControl({
    label: 'Size of the ball',
    value: 64,
    min: 0,
    max: vh / 2,
    step: 1,
  });

  const [rows, RowsControl] = useFaderControl({
    label: 'Rows',
    value: 8,
    min: 0,
    max: 128,
    step: 1,
  });
  const [cols, ColsControl] = useFaderControl({
    label: 'Cols',
    value: 8,
    min: 0,
    max: 128,
    step: 1,
  });
  const [STAGGER_X, StaggerXControl] = useFaderControl({
    label: 'Stagger Horizontal',
    value: 0,
    min: 0,
    max: 1000,
    step: 1,
  });
  const [STAGGER_Y, StaggerYControl] = useFaderControl({
    label: 'Stagger Vertical',
    value: 0,
    min: 0,
    max: 1000,
    step: 1,
  });

  const [A, AControl] = useFaderControl({
    label: 'Amplitude',
    value: 2,
    min: 0.01,
    max: 5,
    step: 0.01,
  });
  const [x, XControl] = useFaderControl({
    label: 'distance',
    value: 1,
    min: 0.01,
    max: 100,
    step: 0.01,
  });
  const [v, VControl] = useFaderControl({
    label: 'speed',
    value: 0.001,
    min: 0.0001,
    max: 1,
    step: 0.0001,
  });
  const [lambda, LambdaControl] = useFaderControl({
    label: '𝜆',
    value: 0.2,
    min: 0.001,
    max: 5,
    step: 0.001,
  });

  const [showRainbow, RainbowControl] = useToggleControl({
    label: 'Show Rainbow balls',
    value: false,
  });
  const [showBees, BeesControl] = useToggleControl({
    label: 'Show BEES!',
    value: true,
  });

  useRaf( ({t, dt, elapsed}) => {
    const c = ref.current.getContext('2d');

    const w = ref.current.width;
    const h = ref.current.height;
    c.clearRect(0, 0, w, h);

    // c.fillStyle = `hsl(${(1 + Math.sin(t * 0.001))/2 * 255} 50% 50%)`;
    // c.fillRect(0, 0, w, h);
    const C = cols + wave({t, v: 0.001, lambda: 1, x: 0, A: 0});
    const R = rows + wave({t, v: 0.001, lambda: 2, x: 0, A: 0});

    if (showRainbow) {
      grid({
        rows: R,
        cols: C,
        processor: ([i,j]) => {
          const phi = wave({t: t * 0.005 + i + j, v: 1, lambda: 0.1, x: 1, A: 200})
          const phiPrime = wave({t: t + i * STAGGER_X + j * STAGGER_Y, v, lambda, x, A})

          c.fillStyle = `hsl(${phi} 50% 50%)`;
          c.beginPath();
          c.arc(
            w / R * i,
            h / C * j,
            ballSize + phiPrime,
            0,
            2 * Math.PI
          );
          c.fill();
        }
      });
    }

    if (showBees) {
      grid({
        rows: R,
        cols: C,
        processor: ([i,j]) => {
          c.fillStyle = `hsl(50 50% 50%)`;
          c.beginPath();
          c.arc(
            w / R * i + Math.sin(t * 0.008 + i) * 15,
            h / C * j + Math.cos(t * 0.008 + i) * 5,
            32,
            0,
            2 * Math.PI
          );
          c.fill();
        },
      });
    }

    c.font = '14px monospace';
    c.fillStyle = `rgb(255 0 255 / 1)`;
    c.fillText('cool', 16, 128);
  });

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
        <RowsControl />
        <ColsControl />

        <RainbowControl />
        {showRainbow ? (
          <>
            <BallSizeControl />
            <AControl />
            <VControl />
            <XControl />
            <LambdaControl />
            <StaggerXControl />
            <StaggerYControl />
          </>
        )
        : null}

        <BeesControl />
        {!showBees ? (
          <div
            style={{
            }}
          >
            well goddamn bees now
          </div>
        )
        : null}
      </div>

      <canvas
        ref={ref}
        width={vw}
        height={vh}
        style={{
          position: 'fixed',
          zIndex: 2,
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};




/*
 *
float x, float y, float radius,
float startAngle, float endAngle,

beginPath()
closePath()
fill()
stroke()
clip()
moveTo(float x, float y)
lineTo(float x, float y)
quadraticCurveTo(float cpx, float cpy, float x, float y)
bezierCurveTo(
float cp1x, float cp1y, float cp2x,
float cp2y, float x, float y)
arcTo(float x1, float y1, float x2, float y2, float radius)
arc(
float x, float y, float radius,
float startAngle, float endAngle,
boolean anticlockwise)
rect(float x, float y, float w, float h)
isPointInPath(float x, float y)


*/

function TESTwave({ A, lambda, x, v, t, }) {
  const w1 = A * Math.sin(
    (2 * Math.PI * x)
    / (lambda - 2 * Math.PI * v * t)
  );
  console.table({ w1, A, lambda, x, v, t });
  return w1.toFixed(3);
}
