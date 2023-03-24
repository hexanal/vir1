import { useState, useRef, useEffect } from "react";

function useCursor({ ref, offset = [0, 0] } = {}) {
  const [pointerData, setPointerData] = useState([]);
  const [gamepadData, setGamepadData] = useState([]);

  const cursorDataRef = useRef({
    pointers: [],
    gamepads: [],
    ratio: { x: 0, y: 0 },
  });

  useEffect(() => {
    function handlePointerMove(event) {
      const { pageX, pageY } = event.touches ? event.touches[0] : event;
      setPointerData([{ x: pageX, y: pageY }]);
    }

    function handleGamepadAxesChange(event) {
      const { axes } = event;
      setGamepadData([{
        x: axes[0] || 0,
        y: axes[1] || 0,
      }]);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove);
    window.addEventListener("mousemove", handlePointerMove);

    window.addEventListener("gamepadconnected", function (event) {
      event.gamepad.addEventListener("change", handleGamepadAxesChange);
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("mousemove", handlePointerMove);

      window.removeEventListener("gamepadconnected", function (event) {
        event.gamepad.removeEventListener("change", handleGamepadAxesChange);
      });
    };
  }, []);

  useEffect(() => {
    const nowCursorData = {
      pointers: pointerData,
      gamepads: gamepadData,
      ratio: { x: 0, y: 0 },
    };

    if (ref && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const x =
        (nowCursorData.pointers.length > 0
          ? nowCursorData.pointers[0].x - rect.x - offset[0]
          : 0) / rect.width;
      const y =
        (nowCursorData.pointers.length > 0
          ? nowCursorData.pointers[0].y - rect.y - offset[1]
          : 0) / rect.height;

      nowCursorData.ratio = { x: x * 2 - 1, y: y * -2 + 1 };
    }

    cursorDataRef.current = nowCursorData;
  }, [pointerData, gamepadData, ref, offset]);

  return cursorDataRef.current;
}

export default useCursor;

