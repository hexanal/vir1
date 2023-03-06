import { useState, useCallback, useEffect } from 'react';

// TODO split concerns per gamepad
// + by button
// split all buttons in props
//  up
//  down
//  left
//  right
//  start
//  select
//  pad
//  ...
//   a: 0
//   b: 1 for e.g.
//   x: 0
//   y: 0
//   rightStickAxisX
//   rightStickAxisY
//   leftStickAxisX
//   leftStickAxisY
//   R2 : 0->1
//   L2 : 0->1
//   R1
//   L1
export default function useGamepads(config = {}) {
  const [gamepads, setGamepads] = useState(null);

  const getGamepadInputs = useCallback((gamepadIndex = 0) => {
    if (gamepads === null) return;
    if (!gamepads[gamepadIndex]) return;

    // directions
    const { axes = null, buttons = [] } = gamepads[gamepadIndex];
    const leftStick = axes !== null ? [ axes[0], axes[1] ] : [0,0];
    const rightStick = axes !== null ? [ axes[2], axes[3] ] : [0,0];

    // pressed buttons
    const pressed = buttons.map(b => b.pressed);

    // triggers
    const leftTrigger = buttons[6] ? buttons[6].value : 0;
    const rightTrigger = buttons[7] ? buttons[7].value : 0;

    return {
      leftStick,
      rightStick,

      leftTrigger,
      rightTrigger,

      buttonUp: pressed[3], // triangle
      buttonDown: pressed[0], // x
      buttonLeft: pressed[2], // square
      buttonRight: pressed[1], // circle
    };
  }, [gamepads]);

  const onGamepadConnected = useCallback(() => {
    setGamepads(navigator.getGamepads());
  }, [setGamepads]);

  useEffect(() => {
    window.addEventListener('gamepadconnected', onGamepadConnected);

    return () => {
      window.removeEventListener('gamepadconnected', onGamepadConnected);

    };
  }, [onGamepadConnected]);

  return {
    gamepads,
    getGamepadInputs,
  };
}

