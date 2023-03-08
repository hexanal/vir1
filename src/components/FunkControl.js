import { useCallback, useState, useEffect, useRef } from 'react';

import usePointer from '../hooks/usePointer';

import Scanner from '../components/viz/Scanner';

export default function FunkControl(props) {
  const {
    value = 0,
    multiplier = 1,
    size = [5, 1.5],
    onChange,
  } = props || {};
  const s = size[0];
  const interact = useRef(false);
  const ref = useRef(null);
  const val = useRef(value);

  const { pointers } = usePointer();
  const primary = pointers[0];
  const { movement } = primary || {};

  // TODO maybe with useCollision ? or something
  const onPointerDown = useCallback(() => {
    interact.current = true;
    ref.current.requestPointerLock({
      unadjustedMovement: true,
    });
  }, []);
  const onPointerMove = useCallback((e) => {
    // interact.current = movement !== undefined;
  }, [pointers]);
  const onPointerUp = useCallback(() => {
    interact.current = false;

    document.exitPointerLock();
  }, [pointers]);

  useEffect(() => {
    if (!interact.current) return;

    const [dx = 0] = movement || [];
    const alphaX = 1 / window.innerWidth;
    const alphaY = 1 / window.innerHeight;

    val.current = movement ? val.current + dx * alphaX * multiplier : val.current;

    if (typeof onChange === 'function') {
      onChange(val.current);
    }

  }, [movement, onChange, multiplier]);

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
      <Scanner
        use={val.current / multiplier}
        size={size}
        withValue
        {...props}
      />
    </div>
  );
}
