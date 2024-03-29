import { useCallback, useState, useEffect, useRef } from 'react';

import useSize from './useSize';

export default function useCollision(props) {
  const {
    ref = null,
    coords = null,
  } = props || {};

  const [x = 0, y = 0] = coords || [];
  const bounds = useRef([0, 0]);
  // const size = useRef([0, 0]);
  const hit = useRef([0, 0]);
  const isInside = useRef(false);
  // TODO
  const { rect } = useSize({ ref });

  useEffect(() => {
    const b = ref.current ? ref.current.getBoundingClientRect() : null;
    const { x: elx, y: ely, width: elWidth, height: elHeight } = b || {};
    bounds.current = [elx, ely];
  }, [rect]);

  useEffect(() => {
    if (x && y) {
      const [offsetX, offsetY] = bounds.current;
      // TODO to ponder
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
  }, [x, y, rect]);

  return {
    hit: hit.current,
    bounds: bounds.current,
    isInside: isInside.current,
  };
}

