import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated as a } from "@react-spring/web";
import useRaf from "../hooks/useRaf";

export default function HomeLink(props) {
  const {
    active = true,
    label = null,
    prefix = null,
    to = null,
    symbol = '✧',
    motion = false,
  } = props || {};

  const wob = useRef(0);
  const wob2 = useRef(0);
  const wob3 = useRef(0);

  const timeFactor = 0.01;
  const stagger = 80;
  const amplitude = 0.25;

  const [{ opacity, wobble }, springApi] = useSpring(
    () => ({
      opacity: 1,
      wobble: 0,
      config: { tension: 350, friction: 20 },
    }),
    []
  );

  const onMouseEnter = useCallback((e) => {
    springApi.start({
      wobble: 1,
      config: { tension: 400, friction: 15 },
    });

  }, [springApi]);

  const onMouseLeave = useCallback((e) => {
    springApi.start({
      wobble: 0,
      config: { tension: 100, friction: 30 },
    });
  }, [springApi]);

  const { t } = useRaf();

  useEffect( () => {
    springApi.start({
      opacity: active ? 1 : 0,
      config: {
        tension: active ? 200 : 300,
        friction: active ? 8 : 20,
      }
    });
  }, [active]);

  const sty = useCallback( (w, staggerDelay = 0 ) => {
    const finalWobble = Math.sin((t + staggerDelay) * timeFactor) * w * amplitude;

    return `
      translateY(${finalWobble}rem)
    `;
  }, [t]);

  return (
    <a.div
      style={{
        width: '100%',
        opacity,
        transform: opacity.to(o => `
          scaleY(${o})
          skewX(${(1 - o) * -45}deg)
        `),
        pointerEvents: active ? 'auto' : 'none'
      }}
    >
      <Link
        className="HomeLink"
        to={to}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        { prefix ? (
          <a.div
            style={{
              transform: wobble.to(sty)
            }}
            className="HomeLink__prefix"
          >
            {prefix}
          </a.div>
        ): null}

        { symbol ? (
          <a.div
            style={{
              transform: wobble.to(w => sty(w, stagger)),
            }}
            className="HomeLink__symbol"
          >
            {symbol}
          </a.div>
        ): null}

        { label ? (
          <a.div
            style={{
              transform: wobble.to(w => sty(w, stagger * 2)),
            }}
            className="HomeLink__label"
          >
            {label}
          </a.div>
        ): null}
      </Link>
    </a.div>
  );
}

