import { useCallback, useState, useEffect, useRef } from 'react';

import useSize from './useSize';

export default function useCollision(props) {
  const {
    ref = null,
    cursor = null,
  } = props || {};

  const [x = 0, y = 0] = cursor || [];
  const bounds = useRef([0, 0]);
  const hit = useRef([0, 0]);
  const isInside = useRef(false);
  const { size, rect } = useSize({ ref });

  useEffect(() => {
    const b = ref.current ? ref.current.getBoundingClientRect() : null;
    const { x: elx, y: ely } = b || {};
    bounds.current = [elx, ely];
  }, [rect]);

  useEffect(() => {
    if (x && y) {
      const [offsetX, offsetY] = bounds.current;
      const { width, height } = rect || {};
      // TODO 4d-ify [x,y,z,t]
      // n-dimensional
      const diffX = x - offsetX;
      const ratioX = diffX / width;
      const diffY = y - offsetY;
      const ratioY = diffY / height;

      hit.current = [ratioX * 100, ratioY * 100];
      isInside.current =
        x > offsetX &&
        x < offsetX + width &&
        y > offsetY &&
        y < offsetY + height
    } else {
      hit.current = null;
      isInside.current = null;
    }
  }, [x, y]);

  return {
    hit: hit.current,
    bounds: bounds.current,
    isInside: isInside.current,
  };
}

