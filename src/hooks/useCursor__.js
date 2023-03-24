import { useState, useEffect } from 'react';

const useCursor = (props) => {
  const { offset, ratioOffset } = props || {};
  const {
    offsetX = 0,
    offsetY = 0
  } = offset || {};
  const {
    ratioOffsetX = 0,
    ratioOffsetY = 0
  } = ratioOffset || {};
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0 });
  const [ratio, setRatio] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event) => {
    setPosition({ x: event.clientX + offsetX, y: event.clientY + offsetY });
  };

  const handleGamepadMove = (gamepad) => {
    const [stickX, stickY] = gamepad.axes;
    setPosition({ x: stickX, y: stickY });
  };

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('gamepadmove', handleGamepadMove);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('gamepadmove', handleGamepadMove);
    };
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setVelocity((prevState) => ({
        x: (position.x - prevState.x) / 16.666,
        y: (position.y - prevState.y) / 16.666,
      }));
    }, 16.666);

    return () => clearInterval(timerId);
  }, [position]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setAcceleration((prevState) => ({
        x: (velocity.x - prevState.x) / 16.666,
        y: (velocity.y - prevState.y) / 16.666,
      }));
    }, 16.666);

    return () => clearInterval(timerId);
  }, [velocity]);

  useEffect(() => {
    setRatio({
      x: parseFloat(((position.x - window.innerWidth / 2) / (window.innerWidth / 2)).toFixed(2) + ratioOffsetX),
      y: parseFloat(((position.y - window.innerHeight / 2) / (window.innerHeight / 2)).toFixed(2) + ratioOffsetY),
    });
  }, [position, ratioOffsetX, ratioOffsetY]);

  return { position, velocity, acceleration, ratio };
};

export default useCursor;

