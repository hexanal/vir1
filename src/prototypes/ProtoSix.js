import { v4 as uuidv4 } from 'uuid';
import { useCallback, useState, useEffect, useRef } from 'react';

import { lerp, smoothstep } from '../utils/interpolate';

import useRaf from '../hooks/useRaf';
import usePointers from './usePointers';

export default function ProtoSix(props) {
  const ref = useRef(null);
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const { pointers, primaryPointer, mouseButtonsPressed } = usePointers();
  const { x: alphaX, y: alphaY } = pointers[0] || {};
  const { x: betaX, y: betaY } = pointers[1] || {};
  const { x: gammaX, y: gammaY } = pointers[2] || {};
  const { x, y } = primaryPointer || {};

  useRaf( ({ t, dt } ) => {
    const c = ref.current.getContext('2d');
    const w = ref.current.width;
    const h = ref.current.height;
    c.clearRect(0, 0, w, h);

    c.font = '13px monospace';
    c.fillStyle = `rgb(0 0 255 / 1)`;
    c.fillText(`x ${x}`, 20, 20);
    c.fillText(`y ${y}`, 20, 40);

    c.fillStyle = `rgb(255 0 0 / 1)`;
    c.beginPath();
    c.arc( alphaX, alphaY,
      20,
      0,
      2 * Math.PI
    );
    c.fill();

    c.fillStyle = `rgb(0 255 0 / 1)`;
    c.beginPath();
    c.arc( betaX, betaY,
      20,
      0,
      2 * Math.PI
    );
    c.fill();

    c.fillStyle = `rgb(0 0 255 / 1)`;
    c.beginPath();
    c.arc( gammaX, gammaY,
      20,
      0,
      2 * Math.PI
    );
    c.fill();
  });

  return (
    <div>
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


