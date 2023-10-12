import { useState, useEffect } from 'react';

const usePhysicsInterpolation = (initialValue, mass, friction) => {
  const [currentValue, setCurrentValue] = useState(initialValue);
  const [targetValue, setTargetValue] = useState(initialValue);
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    const updateValue = () => {
      const force = mass * (targetValue - currentValue) - friction * velocity;

      const newVelocity = velocity + force;
      const newValue = currentValue + newVelocity;

      setCurrentValue(newValue);
      setVelocity(newVelocity);
    };

    const animationFrameId = requestAnimationFrame(updateValue);

    return () => cancelAnimationFrame(animationFrameId);
  }, [currentValue, targetValue, mass, friction, velocity]);

  const setInterpolatedValue = (newValue) => {
    setTargetValue(newValue);
  };

  return [currentValue, setInterpolatedValue];
};

export default usePhysicsInterpolation;
