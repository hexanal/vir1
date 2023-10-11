import { useCallback, useState, useEffect, useRef } from 'react';
import useRaf  from "../hooks/useRaf";
import useStepper  from "../hooks/useStepper";

export function smoothstep(x, a, b) {
  x = x * x * (3.0 - 2.0 * x);
  return x * (b - a) + a;
}

export default function useReefer({
  initialValue = null,
  next = null,
}) {
  const value = useRef(initialValue);

  useRaf(({t}) => {
    const diff = value.current - next;
    const diff2 = diff.toFixed(8) / 1;
    const sign = diff2 > 0 ? 1 : -1;

    const smoot = smoothstep(diff2, value.current, next);

    console.log(smoot);
    value.current = smoot;

    // value.current = value.current
    //   - Math.abs(diff2 * diff2)
    //     * sign
    // ;
  }, [next]);

  return value.current;
}

