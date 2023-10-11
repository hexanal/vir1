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

export default function CanvasGrid(props) {
  const { t, elapsed } = useRaf();

  const ref = useRef(null);

  const [snapValue, SnapValueFader] = useFaderControl({
    label: 'Snap',
    value: 16,
    min: 8,
    max: 64,
    step: 8,
  });
  const [motionValue, MotionFader] = useFaderControl({
    label: 'Motion',
    value: 1,
    min: 0,
    max: 1,
    step: 0.01,
  });
  const [showGridValue, ShowGridButton] = useToggleControl({
    label: 'Show Grid',
    value: true,
  });

  const getSnappedValue = useCallback(([x, y]) => {
    const snip = 100 / (snapValue);

    return [
      Math.round(x / snip) * snip,
      Math.round(y / snip) * snip
    ];
  }, [snapValue]);

  const onContextMenu = useCallback(e => {
    e.preventDefault();
  }, []);

  useEffect( () => {
    if (ref.current === null) return;

    const c = ref.current.getContext('2d');

    ref.current.width = window.innerWidth;
    ref.current.height = window.innerHeight;

    const w = ref.current.width;
    const h = ref.current.height;
    c.clearRect(0, 0, w, h);

    const [x, y] = hit.current;

    if (showGridValue) {
      grid({
        rows: snapValue,
        cols: snapValue,
        processor: ([i,j]) => {
          c.fillStyle = `rgb(255 0 255 / 1)`;

          const pointX = w / snapValue * i;
          const pointY = h / snapValue * j;

          const displaceX = ((x/100 * w) - pointX) / w;
          const displaceY = ((y/100 * h) - pointY) / h;

          const motionX = Math.sin(t * 0.002 + j) * 50 * displaceX;
          const motionY = Math.cos(t * 0.001 + i) * 50 * displaceY;

          c.beginPath();
          c.arc(
            pointX + motionX,
            pointY + motionY,
            1,
            0,
            2 * Math.PI
          );

          /*
          if (i % 20 === 0 && j % 20 === 0) {
            c.font = '8px monospace';
            c.fillStyle = `rgb(0 0 255 / 1)`;
            // c.fillText(`${pointY}`, pointX, pointY);
            c.fillText(`${((x/100 * w) - pointX) / w}`, pointX, pointY + 30);
            c.fillText(`${((y/100 * h) - pointY) / h}`, pointX, pointY + 60);
            // c.fillText(`${y / pointY}`, pointX, pointY + 60);
            // c.fillText(`${pointX}`, pointX, pointY);
            // c.fillText(`${pointY}`, pointX, pointY + 30);
            // c.fillText(`${x}`, pointX, pointY + 60);
            // c.fillText(`${y}`, pointX, pointY + 90);
          }
          */

          c.fill();
        },
      });
    }

    // points.current.map( (point, i) => {
    //     c.fillStyle = `rgb(0 0 255 / 1)`;
    //     c.beginPath();
    //     // const distance = Math.sqrt( (point[1] - y) **2 + (point[0] - x) **2 ).toFixed(3) / 100;
    //     const motionX = motionValue * (Math.sin(t * 0.009 + i / 10));// * Math.max(-100, Math.min(100, 5 * Math.tan(t * 0.001 + i / 100))));
    //     const motionY = motionValue * (Math.cos(t * 0.001 + i / 10) * 10);// * Math.max(-100, Math.min(100, 5 * Math.tan(t * 0.005 + i / 100))));
    //     c.arc(
    //       point[0]/100 * w + motionX,
    //       point[1]/100 * h + motionY,
    //       4 + motionX * 1,
    //       0,
    //       2 * Math.PI
    //     );
    //     c.fill();
    // });
  }, [t, snapValue, motionValue, showGridValue]);

  const hit = useRef([0, 0]);
  const snappedPosition = useRef([0, 0]);
  const points = useRef([]);
  const jsonOutput = useRef('');

  const onPointerUp = useCallback(e => {
    const pointsJSON = JSON.stringify(points.current);

    jsonOutput.current = pointsJSON;
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

    snappedPosition.current = getSnappedValue(hit.current);

    if (buttons === 1) {
      if ( !arrayHas(points.current, snappedPosition.current)  ) {
        points.current.push(snappedPosition.current);
      }
    }
  }, [getSnappedValue]);
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

    snappedPosition.current = getSnappedValue(hit.current);

    if (buttons === 1) {
      if ( !arrayHas(points.current, snappedPosition.current)  ) {
        points.current.push(snappedPosition.current);
      }
    }
  }, [getSnappedValue]);

  const onGetPointsJSON = useCallback(() => {
    console.log('should get');
  }, []);

  useEffect(() => {
    document.addEventListener('pointermove', onPointerMove);
    ref.current.addEventListener('pointerdown', onPointerDown);
    ref.current.addEventListener('pointerup', onPointerUp);
  }, [onPointerMove, onPointerDown, onPointerUp]);

  return (
    <div
      style={{
        overflow: 'hidden',
        position: 'fixed',
        zIndex: -1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
      onContextMenu={onContextMenu}
    >
      <ControlPanel style={{
        display: 'none',
        position: 'absolute',
        zIndex: 2,
        top: '1rem',
        right: '1rem',
      }}>
        <ShowGridButton />
        <SnapValueFader />
        <MotionFader />
        <textarea
          style={{
            overflow: 'auto',
            width: '10rem',
            height: '5rem',
            border: '2px solid grey',
            fontSize: '0.4rem',
            resize: 'vertical',
          }}
          value={jsonOutput.current}
          readOnly
        />
      </ControlPanel>

      <canvas
        ref={ref}
        style={{
          width: 'auto',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
          border: `1px solid grey`,
       }}
      />
    </div>
  );
};

