import { useCallback, useState, useEffect, useRef } from 'react';
import BiAxialScanner from './BiAxialScanner';
import usePointer from '../hooks/usePointer';

export default function BiAxialControls(props) {
  const {
    // x = 0,
    // y = 0,
    size = [3, 3],
  } = props || {};
  const s = size[0];
  const ref = useRef(null);
  const coords = useRef([0,0]);

  const onPointerDown = useCallback(() => {
    ref.current.requestPointerLock({
      unadjustedMovement: true,
    });
  }, []);
  const onPointerMove = useCallback(() => {
    console.log('scan it some more');
  }, []);
  const onPointerUp = useCallback(() => {
    console.log('scan it not no more');
    document.exitPointerLock();
  }, []);

  const { pointers } = usePointer();
  // const { pointers } = usePointer({
  // });
  // const { mouse: mousePosition } = mouse || {};

  useEffect(() => {
    const primary = pointers[0];
    const { position, displace, movement } = primary || {};
    const [dx = 0, dy = 0] = movement || [];
    const alphaX = 1 / window.innerWidth;
    const alphaY = 1 / window.innerHeight;
    const beta = 0.85;

    coords.current = [
      primary ? coords.current[0] + dx * alphaX * beta : 0,
      primary ? coords.current[1] + dy * alphaY * beta : 0,
    ];

  }, [pointers]);

  return (
    <div
      className="scanner"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      ref={ref}
      style={{
        width: `${s}rem`,
        height: `${s}rem`,
        cursor: `move`,
      }}
    >
      <BiAxialScanner
        x={coords.current[0]}
        y={coords.current[1]}
        size={size}
        {...props}
      />
    </div>
  );
}
