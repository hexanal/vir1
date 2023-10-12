import { useState, useEffect } from 'react';

function useInterpolation({ initialValue, interpolator = linearInterpolator, speed = 0.02, precision = 10 }) {
  const [currentValue, setCurrentValue] = useState(initialValue);
  const [targetValue, setTargetValue] = useState(initialValue);

  useEffect(() => {
    let animationFrameId;

    const updateValue = () => {
      if (currentValue !== targetValue) {
        const diff = targetValue - currentValue;
        const interpolatedStep = interpolator(diff, speed);
        const newValue = parseFloat((currentValue + interpolatedStep).toFixed(precision));
        setCurrentValue(newValue);
        animationFrameId = requestAnimationFrame(updateValue);
      }
    };

    updateValue();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentValue, targetValue, interpolator, speed, precision]);

  const setValue = (newTargetValue) => {
    setTargetValue(newTargetValue);
  };

  return [currentValue, setValue];
}

// Default linear interpolator function
const linearInterpolator = (diff, speed) => diff * speed;

export default useInterpolation;

