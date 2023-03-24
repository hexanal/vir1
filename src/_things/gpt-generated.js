/**
 * given a ref
 */
function getPosition(ref, ratio, origin = 'center') {
  const rect = ref.current.getBoundingClientRect();
  const x = rect.left + rect.width * ratio.x;
  const y = rect.top + rect.height * ratio.y;
  
  if (origin === 'center') {
    return { x, y };
  }
  
  const offsetX = origin.x * rect.width;
  const offsetY = origin.y * rect.height;
  
  return { x: x - offsetX, y: y - offsetY };
}


/**
 * useCursor
 */
import { useState, useEffect, useRef } from 'react';

function useCursor({ ref, offset = { x: 0, y: 0 } } = {}) {
  const [cursorData, setCursorData] = useState({
    pointers: [],
    gamepads: [],
    velocity: { x: 0, y: 0 },
    acceleration: { x: 0, y: 0 },
    ratio: { x: 0, y: 0 },
  });
  const prevCursorDataRef = useRef(cursorData);

  useEffect(() => {
    function handlePointerMove(event) {
      event.preventDefault();
      const pointers = Array.from(event.targetTouches).map((touch) => ({
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY,
        timestamp: Date.now(),
      }));
      setCursorData((prev) => ({
        ...prev,
        pointers,
      }));
    }

    function handleMouseMove(event) {
      const { clientX, clientY } = event;
      const pointers = [{ id: 'mouse', x: clientX, y: clientY, timestamp: Date.now() }];
      setCursorData((prev) => ({
        ...prev,
        pointers,
      }));
    }

    function handleGamepadUpdate(gamepad) {
      const gamepads = Array.from(navigator.getGamepads()).map((gamepad) => ({
        id: gamepad.index,
        x: gamepad.axes[0],
        y: gamepad.axes[1],
        timestamp: Date.now(),
      }));
      setCursorData((prev) => ({
        ...prev,
        gamepads,
      }));
    }

    document.addEventListener('pointermove', handlePointerMove, { passive: false });
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('gamepadconnected', (event) => {
      const gamepad = event.gamepad;
      setInterval(() => handleGamepadUpdate(gamepad), 16);
    });

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const prev = prevCursorDataRef.current;
    const now = cursorData;

    const deltaTime = now.pointers[0]?.timestamp - prev.pointers[0]?.timestamp || 0;
    const deltaX = now.pointers[0]?.x - prev.pointers[0]?.x || 0;
    const deltaY = now.pointers[0]?.y - prev.pointers[0]?.y || 0;

    const velocity = { x: deltaX / deltaTime, y: deltaY / deltaTime };
    const prevVelocity = prev.velocity;
    const acceleration = {
      x: (velocity.x - prevVelocity.x) / deltaTime,
      y: (velocity.y - prevVelocity.y) / deltaTime,
    };

    const rect = ref?.current?.getBoundingClientRect();
    const ratio = rect
      ? {
          x: ((now.pointers[0]?.x - rect.left) / rect.width) * 2 - 1 - offset.x,
          y: ((now.pointers[0]?.y - rect.top) / rect.height) * 2 - 1 - offset.y,
        }
      : { x: 0, y: 0 };

    prevCursorDataRef.current = now;
    setCursorData((prev) => ({
      ...prev,
      velocity,
      acceleration,
      ratio,
    }));
  }, [ref, offset, cursorData]);

  return cursorData;
}

