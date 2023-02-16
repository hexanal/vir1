import { useCallback, useState, useEffect } from 'react';

export default function useMouse(config = {}) {
  const [position, setPosition] = useState([0, 0]);
  const [buttons, setButtons] = useState([]);

  const onMouseMove = useCallback(e => {
    const {
      clientX = 0,
      clientY = 0,
      buttons: pressedButtons = 0
    } = e || {};

    if (pressedButtons === 0) {
      setButtons([]);
    }

    setPosition([clientX, clientY]);
  }, [setPosition]);

  const onMouseDown = useCallback(e => {
    // console.log({mousedown: true, e});

    const { button = 0, pressedButtons = 0 } = e || {};

    setButtons(b => [...b, button]);
  }, [setButtons]);

  const onMouseUp = useCallback(e => {
    // console.log({Mouseup: true, e});

    const { button = 0, buttons: pressedButtons = 0 } = e || {};
    if (pressedButtons === 0) {
      setButtons([]);
    }
    // TODO handle more?
    if (pressedButtons >= 3) {
      setButtons( pressedButtons.filter(b => b !== button) );
    }
  }, [setButtons]);

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseDown, onMouseUp]);

  return {
    position,
    buttons,
  };
}

