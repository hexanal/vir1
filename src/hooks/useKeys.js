import { useState, useCallback, useEffect } from 'react';

export default function useMouse(config = {}) {
  const [keys, setKeys] = useState([]);

  const onKeyDown = useCallback(e => {
    // console.log({keydown: true, e});
    const { key = null } = e || {};

    if (key) {
      setKeys(k => [...(k.filter(n => n !== key)), key]);
    }
  }, [setKeys]);

  const onKeyUp = useCallback(e => {
    // console.log({keyup: true, e});
    const { key = null } = e || {};

    if (key) {
      setKeys(k => k.filter(n => n !== key));
    }
  }, [setKeys]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [onKeyDown, onKeyUp]);

  return {
    keys,
  };
}

