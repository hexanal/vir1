import { useState, useEffect } from 'react';

const useKeyboard = () => {
  const [pressedKeys, setPressedKeys] = useState(new Set());
  const [keysWithDuration, setKeysWithDuration] = useState(new Set());

  const handleKeyDown = (event) => {
    setPressedKeys((prevState) => {
      const newSet = new Set(prevState);
      newSet.add(event.key);
      return newSet;
    });

    setKeysWithDuration((prevState) => {
      const newSet = new Set(prevState);
      if (!prevState.has(event.key)) {
        newSet.add({
          label: event.key,
          duration: 0,
        });
      }
      return newSet;
    });
  };

  const handleKeyUp = (event) => {
    setPressedKeys((prevState) => {
      const newSet = new Set(prevState);
      newSet.delete(event.key);
      return newSet;
    });
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    const intervalId = setInterval(() => {
      setKeysWithDuration((prevState) => {
        const newSet = new Set(prevState);
        prevState.forEach((keyWithDuration) => {
          const { label, duration } = keyWithDuration;
          newSet.delete(keyWithDuration);
          newSet.add({
            label,
            duration: duration + 100,
          });
        });
        return newSet;
      });
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      clearInterval(intervalId);
    };
  }, []);

  return { pressedKeys, keysWithDuration };
};

export default useKeyboard;

