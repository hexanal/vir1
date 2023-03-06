import { useCallback, useState, useEffect, useRef } from 'react';
import BiAxialScanner from './BiAxialScanner';
import usePointer from '../hooks/usePointer';

export default function BiAxialControls(props) {
  const {
    // x = 0,
    // y = 0,
    multiplier = 1,
    size = [3, 3],
    onChange,
    withSnapBack = false,
  } = props || {};
  const s = size[0];
  const interact = useRef(false);
  const ref = useRef(null);
  const coords = useRef([0,0]);

  const { pointers } = usePointer();
  const interacting = typeof pointers[0] !== 'undefined';

  const onPointerDown = useCallback(() => {
    interact.current = true;
    ref.current.requestPointerLock({
      unadjustedMovement: true,
    });
  }, []);
  const onPointerMove = useCallback((e) => {
    interact.current = interacting;

    if (!interacting && withSnapBack) {
      coords.current = [0, 0];
    }
  }, [pointers]);
  const onPointerUp = useCallback(() => {
    interact.current = false;

    if (withSnapBack) {
      coords.current = [0, 0];
    }
    document.exitPointerLock();
  }, [pointers]);

  useEffect(() => {
    if (!interact.current) return;

    const primary = pointers[0];
    const { position, displace, movement } = primary || {};
    const [dx = 0, dy = 0] = movement || [];
    const alphaX = 1 / window.innerWidth;
    const alphaY = 1 / window.innerHeight;

    coords.current = [
      primary ? coords.current[0] + dx * alphaX * multiplier : 0,
      primary ? coords.current[1] + dy * alphaY * multiplier : 0,
    ];

    if (typeof onChange === 'function') {
      onChange(coords.current);
    }

  }, [pointers, onChange, multiplier]);

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
        x={coords.current[0] / multiplier}
        y={coords.current[1] / multiplier}
        size={size}
        withValue
        {...props}
      />
    </div>
  );
}
