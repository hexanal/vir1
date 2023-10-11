import { v4 as uuidv4 } from 'uuid';
import  {
  Fragment,
  useCallback,
  useState,
  useMemo,
  useEffect,
  useRef
} from 'react';

import useRaf from '../hooks/useRaf';
import useFaderControl from '../hooks/useFaderControl';
import useToggleControl from '../hooks/useToggleControl';

import ControlPanel from '../components/controls/ControlPanel';

import grid from '../utils/grid';

function arrayHas(arr, target) {
  return arr.some((tuple) => {
    return tuple[0] === target[0] && tuple[1] === target[1];
  });
}

function exponential(x) {
  return Math.exp(x);
}

export default function CanvasPro(props) {
  const { t, elapsed } = useRaf();

  const ref = useRef(null);

  const onContextMenu = useCallback(e => {
    e.preventDefault();
  }, []);

  useEffect( () => {
    if (ref.current === null) return;

    const c = ref.current.getContext('2d');
    const w = ref.current.width;
    const h = ref.current.height;
    const range = [-1, 1];
    const iterate = 5;
    const diff = range[1] - range[0];
    const increment = diff / iterate;

    console.log(increment);

    c.clearRect(0, 0, w, h);
    c.beginPath();
    for (let i = 0; i <= iterate; i++) {
      const method = i === 0
        ? 'moveTo'
        : 'lineTo';

      c[method](
        w/2 + range[0]*w + (increment * i) * w,
        h/2
        // range[0] + (increment * i) * h + Math.sin(t * 0.02 + i * 2) * 3,
      );
      c.strokeStyle = `rgb(0 0 255 / 1)`;
      c.lineWidth = 10;
      c.lineCap = 'round';
      c.stroke();
    }
  }, [t]);

  const hit = useRef([0, 0]);
  const points = useRef([]);
  // const jsonOutput = useRef('');

  const onPointerUp = useCallback(e => {
    // const pointsJSON = JSON.stringify(points.current);
    // jsonOutput.current = pointsJSON;
  }, []);
  const onPointerDown = useCallback(e => {
    const { clientX, clientY, buttons, target } = e || {};

    const bounds = ref.current ? ref.current.getBoundingClientRect() : null;
    const { top, left, bottom, right, width, height } = bounds || {};

    const isHit = clientX >= left && clientX <= right
      && clientY >= top && clientY <= bottom;

    if (!isHit) return;

    const x = clientX - left;
    const y = clientY - top;

    const ratioX = x / width;
    const ratioY = y / height;

    hit.current = [
      ratioX * 100,
      ratioY * 100,
    ];

    if (buttons === 1) {
      if ( !arrayHas(points.current, hit.current)  ) {
        points.current.push(hit.current);
      }
    }
  }, []);
  const onPointerMove = useCallback(e => {
    const { clientX, clientY, buttons } = e || {}

    const bounds = ref.current ? ref.current.getBoundingClientRect() : null;
    const { top, left, bottom, right, width, height } = bounds || {};

    const isHit = clientX >= left && clientX <= right
      && clientY >= top && clientY <= bottom;

    if (!isHit) return;

    const x = clientX - left;
    const y = clientY - top;

    const ratioX = x / width;
    const ratioY = y / height;

    hit.current = [
      ratioX * 100,
      ratioY * 100,
    ];

    if (buttons === 1) {
      if ( !arrayHas(points.current, hit.current)  ) {
        points.current.push(hit.current);
      }
    }
  }, []);

  const onGetPointsJSON = useCallback(() => {
    console.log('should get');
  }, []);

  useEffect(() => {
    document.addEventListener('pointermove', onPointerMove);
    ref.current.addEventListener('pointerdown', onPointerDown);
    ref.current.addEventListener('pointerup', onPointerUp);

    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      ref.current.removeEventListener('pointerdown', onPointerDown);
      ref.current.removeEventListener('pointerup', onPointerUp);
    };
  }, [onPointerMove, onPointerDown, onPointerUp]);

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
      // onContextMenu={onContextMenu}
    >
      <canvas
        ref={ref}
        style={{
          width: 'auto',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
          border: `1px solid grey`,
       }}
        width="256"
        height="256"
      />
    </div>
  );
};

