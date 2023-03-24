import { useCallback, useState, useEffect } from 'react';

export default function usePointers() {
  const [pointers, setPointers] = useState({});
  const [primaryPointer, setPrimaryPointer] = useState(null);
  const [mouseButtonsPressed, setMouseButtonsPressed] = useState(new Set());

  function getButtons(buttons) {
    let b = new Set();
    if (buttons === 1 || buttons === 3) {
      b.add('left');
    }
    if (buttons === 2 || buttons === 3) {
      b.add('right');
    }

    return b;
  };

  const handlePointerDown = useCallback((e) => {
    const pointer = {
      x: e.clientX,
      y: e.clientY,
      type: 'mouse',
      pointerId: e.pointerId,
    };
    setPointers((prevState) => ({
      ...prevState,
      [e.pointerId]: pointer,
    }));
    setPrimaryPointer((prevState) => {
      if (!prevState || prevState.type === 'mouse') {
        return pointer;
      }
      return prevState;
    });
    setMouseButtonsPressed(getButtons(e.buttons));
  }, [setPointers, setPrimaryPointer]);

  const handlePointerMove = useCallback((e) => {
    setMouseButtonsPressed(getButtons(e.buttons));
    setPointers((prevState) => {
      const pointer = prevState[e.pointerId];
      if (pointer) {
        return {
          ...prevState,
          [e.pointerId]: {
            ...pointer,
            x: e.clientX,
            y: e.clientY,
          },
        };
      }
      return prevState;
    });
    setPrimaryPointer((prevState) => {
      const pointer = pointers[e.pointerId];
      if (!prevState || prevState.type === 'mouse' || (pointer && pointer.type === 'touch')) {
        return {
          x: e.clientX,
          y: e.clientY,
          type: e.pointerType,
          pointerId: e.pointerId,
        };
      }
      return prevState;
    });
  }, [setPointers, setPrimaryPointer, setMouseButtonsPressed]);

  const handlePointerUp = useCallback((e) => {
    setPointers((prevState) => {
      const { [e.pointerId]: removed, ...rest } = prevState;
      return rest;
    });
    setMouseButtonsPressed(getButtons(e.buttons));
  }, [setPointers, setMouseButtonsPressed]);

  const handleContextMenu = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return { pointers, primaryPointer, mouseButtonsPressed };
}

