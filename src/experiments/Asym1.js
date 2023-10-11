import { v4 as uuidv4 } from 'uuid';
import { useCallback, useState, useEffect, useRef } from 'react';
import { useControls, button } from 'leva';

import useRaf from '../hooks/useRaf';
import useKeys from '../hooks/useKeys';
// import usePointer from '../../hooks/usePointer';

function positionFromOrigin(position, origin) {
    const [x, y] = position;
    const [originX, originY] = origin;

    return [
      x - originX,
      y - originY
    ];
}

const COLORS = [
  'rgb(255 255 0 / 1)',
  'rgb(255 0 255 / 1)',
  'rgb(0 255 255 / 1)',
  'rgb(255 0 0 / 1)',
  'rgb(0 255 0 / 1)',
  'rgb(0 0 255 / 1)',
];

export default function Asym1(props) {
  const ref = useRef(null);

  const fun = (progress, [x, y]) => {
    console.log(x);
    const pathPoints = [
      {
        id: uuidv4(),
        type: 'M',
        coords: [0, 0],
      },
      {
        id: uuidv4(),
        type: 'C',
        coords: [50, 0, 50, 0, 50, (y * 100 + 50) * progress],
      },
      {
        id: uuidv4(),
        type: 'C',
        coords: [50, 0, 50, 0, 100, 0],
      },
    ];
    const path = pathPoints.map(({ type, coords }, i) => {
      const pointString = `${type} ${coords.join(',')}`;
      return pointString;
    }).join(' ');

    return path;
  };

  const [activeIds, setActiveIds] = useState([]);
  const [pointers, setPointers] = useState([]);
  const [primary, setPrimary] = useState(null);
  const [secondary, setSecondary] = useState(null);

  const origin = [window.innerWidth / 2, window.innerHeight / 2];
  const progress = useRef(0);
  const whack = useRef(0);

  useRaf( ({t, elapsed}) => {
    const { positionFromOrigin, buttons } = pointers[0] || {};
    const pressed = buttons === 1 || buttons === 3;
    const [x, y] = positionFromOrigin || [];

    if (pressed) {
      progress.current = progress.current >= 1 ? 1 : progress.current + (0.02 - progress.current * 0.02);
    } else {
      progress.current = progress.current <= 0 ? 0 : progress.current - (0.1 - progress.current * 0.1);
    }

    whack.current = fun(progress.current, [x / window.innerWidth, y / window.innerHeight]);
  }, []);

  const onPointerMove = useCallback(e => {
    const {
      pointerId,
      clientX,
      clientY,
      buttons,
      pointerType,
    } = e;
    const mouseIsReleased = buttons === 0 && pointerType === 'mouse';

    setPointers(pointers =>
      pointers.map(p => {
        const { id } = p;
        if (id === pointerId && mouseIsReleased) {
          return null;
        }
        return id === pointerId ? {
          ...p,
          position: [clientX, clientY],
        positionFromOrigin: positionFromOrigin([clientX, clientY], origin),
          buttons,
        } : p;
      }).filter(p => p !== null)
    );

  }, [pointers, setPointers]);

  const onPointerDown = useCallback(e => {
    const {
      pointerId,
      clientX,
      clientY,
      buttons,
    } = e;

    const newActives = [...activeIds, pointerId];
    setActiveIds(newActives);

    const newPointers = [...pointers, {
      id: pointerId,
      position: [clientX, clientY],
      positionFromOrigin: positionFromOrigin([clientX, clientY], origin),
      buttons,
      backgroundColor: COLORS[newActives.length - 1]
    }];
    setPointers(newPointers);

  }, [activeIds, setActiveIds, pointers, setPointers]);

  const onPointerUp = useCallback(e => {
    const { pointerId } = e;

    const newActives = activeIds.filter(id => {
      return id !== pointerId;
    });
    setActiveIds(newActives);

    const newPointers = pointers.map(p => {
      const { id } = p;

      return id !== pointerId ? p : null;
    }).filter(p => p !== null);

    setPointers(newPointers);
  }, [activeIds, setActiveIds, pointers, setPointers]);

  useEffect(() => {
    ref.current.addEventListener('pointermove', onPointerMove);
    ref.current.addEventListener('pointerdown', onPointerDown);
    ref.current.addEventListener('pointerup', onPointerUp);
  }, [onPointerMove, onPointerDown, onPointerUp]);

  return (
    <div 
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'grey'
      }}
    >
      <pre>
        {progress.current}
      </pre>
      <svg
        preserveAspectRatio="none"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <path
          d={whack.current}
          stroke="none"
          fill="rgb(0 0 0 / 1)"
        />
      </svg>
    </div>
  );
};

