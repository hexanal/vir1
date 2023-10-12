import { useCallback, useState, useEffect, useRef } from 'react';
import useRaf  from "../hooks/useRaf";
import useStepper  from "../hooks/useStepper";

export function smoothstep(x, a, b) {
  x = x * x * (3.0 - 2.0 * x);
  return x * (b - a) + a;
}

export default function useReefer(initialValue = null) {
  const value = useRef(initialValue);
  const next = useRef(initialValue);

  const setValue = useCallback((v) => {
    next.current = v;
  }, []);

  useRaf(({t}) => {
    const diff = value.current - next.current;

    // console.log( Math.abs(diff) );

    // const smoot = smoothstep(diff2, value.current, next);

    value.current = next.current;
  }, [value, setValue]);

  return [value.current, setValue];
}

