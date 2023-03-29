import { useState, useEffect } from 'react';

const useGamepads = () => {
  const [gamepads, setGamepads] = useState([]);

  useEffect(() => {
    const handleGamepadConnected = (event) => {
      setGamepads(navigator.getGamepads());
    };

    const handleGamepadDisconnected = (event) => {
      setGamepads(navigator.getGamepads());
    };

    const handleGamepadInput = (event) => {
      setGamepads((prevState) => {
        const newGamepads = [...prevState];
        const gamepadIndex = event.gamepad.index;
        const gamepad = navigator.getGamepads()[gamepadIndex];
        if (gamepad) {
          newGamepads[gamepadIndex] = gamepad;
        }
        return newGamepads;
      });
    };

    window.addEventListener('gamepadconnected', handleGamepadConnected);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

    const intervalId = setInterval(() => {
      setGamepads((prevState) => {
        const newGamepads = [...prevState];
        navigator.getGamepads().forEach((gamepad) => {
          if (gamepad) {
            const buttons = new Set();
            gamepad.buttons.forEach((button, index) => {
              if (button.pressed) {
                buttons.add(index);
              }
            });
            newGamepads[gamepad.index] = {
              ...gamepad,
              buttons,
              axes: [...gamepad.axes],
            };
          }
        });
        return newGamepads;
      });
    }, 16);

    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnected);
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
      clearInterval(intervalId);
    };
  }, []);

  return gamepads;
};

export default useGamepads;

