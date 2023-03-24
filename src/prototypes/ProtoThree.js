import { v4 as uuidv4 } from 'uuid';
import { useCallback, useState, useEffect, useRef } from 'react';

import useRaf from '../hooks/useRaf';
import usePointers from './usePointers';
import useMatter from './useMatter';

export default function ProtoThree(props) {
  const ref = useRef(null);
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const { pointers, primaryPointer, mouseButtonsPressed } = usePointers();
  const { x, y } = pointers[0] || {};
  const { x: primaryX, y: primaryY } = primaryPointer || {};

  const testCoords = useRef([50, 50]);

  const { addPlanet } = useMatter({ ref });

  useEffect(() => {
    // if (mouseButtonsPressed.has('right')) {
    // }
    console.log(mouseButtonsPressed);
  }, [mouseButtonsPressed]);

  useRaf( ({ t, dt } ) => {
    const c = ref.current.getContext('2d');
    const w = ref.current.width;
    const h = ref.current.height;
    c.clearRect(0, 0, w, h);

    c.fillStyle = `hsl(${60 * (mouseButtonsPressed.has('right') ? 2 : 1)} 50% 50%)`;
    c.beginPath();
    c.arc(
      primaryX,
      primaryY,
      20 * (mouseButtonsPressed.has('left') ? 2 : 1),
      0,
      2 * Math.PI
    );
    c.fill();

    c.font = '13px monospace';
    c.fillStyle = `rgb(0 0 255 / 1)`;
    c.fillText(`x ${primaryX}`, 20, 20);
    c.fillText(`y ${primaryY}`, 20, 40);
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

