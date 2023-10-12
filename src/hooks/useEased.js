import { useState, useEffect } from 'react';

function useEased(initialValue, targetValue, params) {
  const [currentValue, setCurrentValue] = useState(initialValue);

  useEffect(() => {
    let startTime;
    let animationFrameId;
    let fromValue = currentValue;

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const deltaTime = timestamp - startTime;
      if (deltaTime < params.duration) {
        // Use an easing function to calculate the intermediate value
        const progress = params.easing(deltaTime / params.duration);
        const easedValue = fromValue + (targetValue - fromValue) * progress;
        setCurrentValue(easedValue);

        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCurrentValue(targetValue);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetValue, params]);

  return [currentValue];
}

export default useEased;
