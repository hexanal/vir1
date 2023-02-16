import { useCallback, useState, useEffect } from 'react';

export default function useX(config = {}) {
  const [x, setX] = useState(null);

  const onX = useCallback(e => {
  }, []);

  useEffect(() => {
    document.addEventListener('x', onX);

    return () => {
      document.removeEventListener('x', onX);
    };
  }, [onX]);

  return {
    x,
  };
}

