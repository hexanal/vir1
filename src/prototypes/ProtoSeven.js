import { v4 as uuidv4 } from 'uuid';
import { useCallback, useState, useEffect, useRef } from 'react';

// import useRaf from '../hooks/useRaf';
import useAnimationFrame from '../hooks/useAnimationFrame';
import useKeyboard from '../hooks/useKeyboard';
import usePointers from './usePointers';

export default function ProtoSeven(props) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const { pointers, primaryPointer, mouseButtonsPressed } = usePointers();
  const { x: alphaX, y: alphaY } = pointers[0] || {};
  const { x: betaX, y: betaY } = pointers[1] || {};
  const { x: gammaX, y: gammaY } = pointers[2] || {};
  const { x, y } = primaryPointer || {};

  const { pressedKeys, keysWithDuration } = useKeyboard();
  const keys = useRef(pressedKeys);

  useAnimationFrame(({t, dt}) => {
    // console.log(keysWithDuration);
  }, [pressedKeys, keysWithDuration]);

  return (
    <div>
    </div>
  );
};


