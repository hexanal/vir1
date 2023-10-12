import { useState, useEffect } from 'react';

const useSmoothTransition = (initialValue, acceleration, topVelocity) => {
  const [currentValue, setCurrentValue] = useState(initialValue);
  const [targetValue, setTargetValue] = useState(initialValue);
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    let animationFrameId;

    const updateValue = () => {
      const displacement = targetValue - currentValue;
      const direction = displacement > 0 ? 1 : -1;

      // Calculate acceleration towards the target value
      const accelerationForce = acceleration * direction;
      // Apply a maximum velocity limit
      const newVelocity = Math.min(topVelocity, Math.abs(velocity + accelerationForce)) * direction;

      const newValue = currentValue + newVelocity;

      setCurrentValue(newValue);
      setVelocity(newVelocity);

      // If we reached the target value, stop the animation
      if (direction * (targetValue - newValue) <= 0) {
        cancelAnimationFrame(animationFrameId);
      } else {
        // Continue animation
        animationFrameId = requestAnimationFrame(updateValue);
      }
    };

    animationFrameId = requestAnimationFrame(updateValue);

    return () => cancelAnimationFrame(animationFrameId);
  }, [currentValue, targetValue, acceleration, topVelocity, velocity]);

  const setSmoothTransitionValue = (newValue) => {
    setTargetValue(newValue);
  };

  return [currentValue, setSmoothTransitionValue];
};

export default useSmoothTransition;

