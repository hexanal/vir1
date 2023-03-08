import { useCallback, useState, useEffect, useRef } from 'react';

export default function useSize({
  ref
}) {
  const element = ref && ref.current ? ref.current : null;
  const size = useRef(null);
  const rect = useRef(null);

  useEffect(() => {
    if (element !== null) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { contentRect } = entry || {};
          const { x, y, width, height } = contentRect || {};
          rect.current = contentRect;
        }
      });

      resizeObserver.observe(element);

      return () => {
        resizeObserver.unobserve(element);
      };
    }
  }, [ref, element]);

  return {
    size: size.current,
    rect: rect.current
  };
}

