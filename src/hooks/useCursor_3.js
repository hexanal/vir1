import { useEffect, useRef } from 'react';

function useCursor({ ref, offset = { x: 0, y: 0 } } = {}) {
  const cursorDataRef = useRef({
    pointers: [],
    gamepads: [],
    velocity: { x: 0, y: 0 },
    acceleration: { x: 0, y: 0 },
    ratio: { x: 0, y: 0 },
  });

  useEffect(() => {
    function handlePointerMove(event) {
      event.preventDefault();
      console.log( event.targetTouches );
      const pointers = Array.from(event.targetTouches).map((touch) => {
        // console.log(touch);

        return {};
        // return {
        //   id: touch.identifier,
        //   x: touch.clientX,
        //   y: touch.clientY,
        //   timestamp: Date.now(),
        // };
      });
      cursorDataRef.current.pointers = pointers;
    }

    function handleMouseMove(event) {
      const { clientX, clientY } = event;
      const pointers = [{ id: 'mouse', x: clientX, y: clientY, timestamp: Date.now() }];
      cursorDataRef.current.pointers = pointers;
    }

    function handleGamepadUpdate(gamepad) {
      const gamepads = Array.from(navigator.getGamepads()).map((gamepad) => {
        // console.log(gamepad);

        return {};
        // return {
        //   id: gamepad.index,
        //   x: gamepad.axes[0],
        //   y: gamepad.axes[1],
        //   timestamp: Date.now(),
        // };
      });
      cursorDataRef.current.gamepads = gamepads;
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
    let prevTimestamp = null;
    let animationFrameId = null;

    function updateCursorData(timestamp) {
      const prevCursorData = cursorDataRef.current;
      const nowCursorData = {
        pointers: prevCursorData.pointers,
        gamepads: prevCursorData.gamepads,
        velocity: { x: 0, y: 0 },
        acceleration: { x: 0, y: 0 },
        ratio: { x: 0, y: 0 },
      };

      if (prevTimestamp !== null) {
        const deltaTime = timestamp - prevTimestamp;

        const deltaX = nowCursorData.pointers[0]?.x - prevCursorData.pointers[0]?.x || 0;
        const deltaY = nowCursorData.pointers[0]?.y - prevCursorData.pointers[0]?.y || 0;
        nowCursorData.velocity = { x: deltaX / deltaTime, y: deltaY / deltaTime };

        const prevVelocity = prevCursorData.velocity;
        nowCursorData.acceleration = {
          x: (nowCursorData.velocity.x - prevVelocity.x) / deltaTime,
          y: (nowCursorData.velocity.y - prevVelocity.y) / deltaTime,
        };
      }

      const rect = ref?.current?.getBoundingClientRect();
      if (rect) {
        nowCursorData.ratio.x = ((nowCursorData.pointers[0]?.x - rect.left) / rect.width) * 2 - 1 - offset.x;
        nowCursorData.ratio.y = ((nowCursorData.pointers[0]?.y - rect.top) / rect.height) * 2 - 1 - offset.y;
      }

      cursorDataRef.current = nowCursorData;
      prevTimestamp = timestamp;

      animationFrameId = requestAnimationFrame(updateCursorData);
    }

    animationFrameId = requestAnimationFrame(updateCursorData);
    return () => cancelAnimationFrame(animationFrameId);
  }, [ref, offset]);

  return cursorDataRef.current;
}

export default useCursor;

