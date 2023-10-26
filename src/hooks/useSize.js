import { useCallback, useState, useEffect, useRef } from 'react';

export default function useSize({
  ref
}) {
  const element = ref && ref.current ? ref.current : null;
  const size = useRef();
  const rect = useRef();

  useEffect(() => {
    if (element !== null) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { contentRect } = entry || {};
          const { x, y, width, height } = contentRect || {};
          rect.current = contentRect;
          size.current = [width, height];
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

