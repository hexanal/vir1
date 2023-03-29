import { v4 as uuidv4 } from 'uuid';
import { useCallback, useState, useEffect, useRef } from 'react';

import { lerp, smoothstep } from '../utils/interpolate';

import useRaf from '../hooks/useRaf';
import useKeys from '../hooks/useKeys';
import usePointers from './usePointers';
import useMatter from './useMatter';

export default function ProtoFour(props) {
  const ref = useRef(null);
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const { pointers, primaryPointer, mouseButtonsPressed } = usePointers();
  const { x, y } = primaryPointer || {};
  const { addPlanet } = useMatter({ ref });

  const { keys } = useKeys();
  useEffect(() => {
    if (keys.includes('a')) {
      addPlanet({
        x,
        y,
        radius: 100,
      });
    }
  }, [x, y, keys]);

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

