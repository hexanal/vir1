import { useCallback, useState, useEffect, useRef } from 'react';
import useRaf from "../hooks/useRaf";
import stepper from "../utils/stepper";

export function onFrame(fn, timestamp = 0) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ( !prefersReducedMotion ) fn(timestamp);

  requestAnimationFrame( function(timestamp) {
    onFrame(fn, timestamp);
  } )
}

export default function useReefer(props, deps) {
  const {
    value = null,
    stiffness = 80,
    damping = 10
  } = props || {};
  const target = useRef(value);
  const interpolated = useRef(value);
  const velocity = useRef(0);

  useRaf(({t}) => {
    const [nextValue, nextVelocity] = stepper({
      target: value,
      current: interpolated.current,
      velocity: velocity.current,
      stiffness,
      damping,
    });

    interpolated.current = nextValue;
    velocity.current = nextVelocity;
  }, [props, deps]);

  return interpolated.current;
}

