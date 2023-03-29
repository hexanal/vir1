import { v4 as uuidv4 } from 'uuid';
import { useCallback, useState, useEffect, useRef } from 'react';

import { lerp, smoothstep } from '../utils/interpolate';

import useRaf from '../hooks/useRaf';
import usePointers from './usePointers';
import greek from '../utils/greek';

export default function ProtoFive(props) {
  const ref = useRef(null);
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const { pointers, primaryPointer, mouseButtonsPressed } = usePointers();
  const { alphaX, alphaY } = pointers[0] || {};
  const { betaX, betaY } = pointers[1] || {};
  const { gammaX, gammaY } = pointers[2] || {};
  const { x, y } = primaryPointer || {};

  const trail = useRef([]);
  const lines = useRef([]);

  useEffect(() => {
    if (mouseButtonsPressed.has('left')) {
      lines.current.push({
        x, y
      });
    }
    if (mouseButtonsPressed.has('right')) {
      trail.current.push({
        x, y
      });
    }
  }, [x, y, mouseButtonsPressed]);

  function modX(x0, i, t) {
    return x0 + Math.sin(t * 0.008 + i * 0.2) * 4;
  }
  function modY(y0, i, t) {
    return y0 + Math.cos(t * 0.008 + i * 0.2) * 4;
  }

  useRaf( ({ t, dt } ) => {
    const c = ref.current.getContext('2d');
    const w = ref.current.width;
    const h = ref.current.height;
    c.clearRect(0, 0, w, h);

    c.fillStyle = `hsl(${60 * (mouseButtonsPressed.has('right') ? 2 : 1)} 50% 50%)`;
    c.beginPath();
    c.arc(
      x,
      y,
      20 * (mouseButtonsPressed.has('left') ? 2 : 1),
      0,
      2 * Math.PI
    );
    c.fill();

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

    c.fillStyle = `rgb(0 0 255 / 1)`;
    c.beginPath();
    c.arc( gammaX, gammaY,
      20,
      0,
      2 * Math.PI
    );
    c.fill();

    lines.current.map( (l, i) => {
      const { x: px, y: py } = lines.current[i - 1] || {};
      const { x: lx, y: ly } = l || {};

      c.moveTo(
        modX(px || lx, i, t),
        modY(py || ly, i, t)
      );
      c.lineWidth = 4;
      c.fillStyle = `transparent`;
      c.strokeStyle = `rgb(255 0 255 / 1)`;

      // console.log( lerp(px, lx, 0.5) );

      c.quadraticCurveTo(
        lerp(modX(px, i, t), lx, 0.5),
        lerp(modY(py, i, t), ly, 0.5),
        // 50,
        // 50,
        // px,
        // py,
        // smoothstep(0.5, px, lx),
        // smoothstep(0.5, py, ly),
        modX(lx, i, t),
        modY(ly, i, t)
      );
      c.stroke();
    });

    trail.current.map( (tr, i) => {
      const { x: dotX, y: dotY } = tr || {};
      c.fillStyle = `rgb(0 0 0 / 1)`;
      c.beginPath();
      c.arc(
        modX(dotX, i, t),
        modY(dotY, i, t),
        5,
        0,
        2 * Math.PI
      );
      c.fill();
    });
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


