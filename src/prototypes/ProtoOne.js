import { v4 as uuidv4 } from 'uuid';
import { useCallback, useState, useEffect, useRef } from 'react';

import useRaf from '../hooks/useRaf';
// import useKeys from '..hooks/useKeys';
import useGamepads from '../hooks/useGamepads';
import useCursor from '../hooks/useCursor';

export default function ProtoOne(props) {
  const ref = useRef(null);
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const { pointers = [], gamepads = [], ratio } = useCursor({
    ref,
    // origin: [window.innerWidth / 2, window.innerHeight / 2]
  });
  const { x, y } = pointers[0] || {};
  const { x: ratioX, y: ratioY } = ratio || {};

  useRaf( ({t, dt, elapsed}) => {
    const c = ref.current.getContext('2d');
    const w = ref.current.width;
    const h = ref.current.height;
    c.clearRect(0, 0, w, h);

    c.fillStyle = `hsl(60 50% 50%)`;
    c.beginPath();
    c.arc(
      x,
      y,
      20,
      0,
      2 * Math.PI
    );
    c.fill();


    c.font = '13px monospace';
    c.fillStyle = `rgb(255 0 0 / 1)`;
    c.fillText(`a useCursor hook`, window.innerWidth / 2, window.innerHeight / 2);
    c.fillText(` generated by ChatGPT... meh :)`, window.innerWidth / 2, window.innerHeight / 2 + 20);
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

