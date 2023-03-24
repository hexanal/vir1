import { useEffect, useRef } from "react";

function useCursor(ref, offset = { x: 0, y: 0 }) {
  const cursorDataRef = useRef({
    pointers: [],
    gamepads: [],
    velocity: { x: 0, y: 0 },
    acceleration: { x: 0, y: 0 },
    ratio: { x: 0, y: 0 }
  });

  useEffect(() => {
    let animationFrameId = null;
    let prevTimestamp = null;

    function updateCursorData(timestamp) {
      const { pointers, gamepads } = cursorDataRef.current;
      const { x: offsetX, y: offsetY } = offset;
      const nowCursorData = {
        pointers: pointers.filter(p => p.active),
        gamepads: gamepads.map(gamepad => {
          return {
            axes: gamepad.axes.map(axis => Math.abs(axis) > 0.1 ? axis : 0)
          };
        }),
        velocity: { x: 0, y: 0 },
        acceleration: { x: 0, y: 0 },
        ratio: { x: 0, y: 0 }
      };

      // Calculate velocity and acceleration
      if (prevTimestamp !== null) {
        const deltaTime = (timestamp - prevTimestamp) / 1000;
        const { x: prevX, y: prevY } = cursorDataRef.current.velocity;
        const { x: ax, y: ay } = cursorDataRef.current.acceleration;
        const { pointers: prevPointers } = cursorDataRef.current;

        const totalX = nowCursorData.pointers.reduce((acc, p) => acc + p.x, 0);
        const totalY = nowCursorData.pointers.reduce((acc, p) => acc + p.y, 0);
        const avgX = totalX / nowCursorData.pointers.length;
        const avgY = totalY / nowCursorData.pointers.length;

        const vx = (avgX - prevPointers.reduce((acc, p) => acc + p.x, 0) / prevPointers.length) / deltaTime;
        const vy = (avgY - prevPointers.reduce((acc, p) => acc + p.y, 0) / prevPointers.length) / deltaTime;
        const ax2 = (vx - prevX) / deltaTime;
        const ay2 = (vy - prevY) / deltaTime;

        nowCursorData.velocity = { x: vx, y: vy };
        nowCursorData.acceleration = { x: ax2, y: ay2 };
      }

      // Calculate ratio
      const targetElement = ref.current;
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const x = ((nowCursorData.pointers.length > 0 ? nowCursorData.pointers[0].x : 0) - rect.left - offsetX) / width * 2 - 1;
        const y = ((nowCursorData.pointers.length > 0 ? nowCursorData.pointers[0].y : 0) - rect.top - offsetY) / height * -2 + 1;
        nowCursorData.ratio = { x, y };
      }

      cursorDataRef.current = nowCursorData;
      prevTimestamp = timestamp;

      animationFrameId = requestAnimationFrame(updateCursorData);
    }

    animationFrameId = requestAnimationFrame(updateCursorData);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [ref, offset]);

  return cursorDataRef.current;
}

export default useCursor;

