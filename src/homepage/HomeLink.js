import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useResize, useSpring, animated as a } from "@react-spring/web";
import useRaf from "../hooks/useRaf";
import useSize from "../hooks/useSize";

export default function HomeLink(props) {
  const {
    active = true,
    current = false,
    label = null,
    prefix = null,
    to = null,
    symbol = null,
    symbolStyle = null,
    color = `rgb(0 0 0 / 1)`,
  } = props || {};

  const ref = useRef(null);
  const { size = [0, 0] } = useSize({ref});
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
  const [{ hover }, hoverSpringApi] = useSpring(
    () => ({
      hover: 0,
      config: { tension: 50, friction: 20 },
    }),
    []
  );

  const onPointerEnter = useCallback((e) => {
    springApi.start({
      wobble: 1,
      config: { tension: 400, friction: 15 },
    });
    if (!current) {
      hoverSpringApi.start({
        hover: 1,
        config: { tension: 600, friction: 30 },
      });
    }
  }, [active, current, springApi, hoverSpringApi]);

  const onPointerLeave = useCallback((e) => {
    springApi.start({
      wobble: 0,
      config: { tension: 100, friction: 30 },
    });
    hoverSpringApi.start({
      hover: 0,
      config: { tension: 200, friction: 30 },
    });
  }, [active, current, springApi, hoverSpringApi]);

  const { t } = useRaf();

  useEffect( () => {
    springApi.start({
      opacity: active ? 1 : 0,
      wobble: 0,
      config: {
        tension: active ? 100 : 300,
        friction: active ? 10 : 20,
      }
    });
    hoverSpringApi.start({
      hover: 0,
    });
  }, [active]);

  const sty = useCallback( (w, staggerDelay = 0 ) => {
    const finalWobble = Math.sin((t + staggerDelay) * timeFactor) * w * amplitude;

    return `
      translateY(${finalWobble}rem)
    `;
  }, [t]);

  const SymbolComponent = symbol;

  return (
    <div
        style={{
          width: '100%',
          position: 'relative',
        }}
    >
      <a.div
        style={{
          position: 'absolute',
          zIndex: 1,
          top: '50%',
          left: '50%',
          width: '100%',
          transform: hover.to(w => `
            translate(-50%, -50%)
            scale(${w})
          `),
          mixBlendMode: 'multiply',
        }}
      >
        <SymbolComponent
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
          }}
          strokeWidth={50}
          stroke={color}
        />
      </a.div>

      <a.div
        style={{
          position: 'relative',
          zIndex: 4,
          display: 'block',
          width: '100%',
          height: ref.current ? opacity.to(o => `${o * ref.current.offsetHeight}px`) : 'auto',
          overflow: 'hidden',
        }}
      >
        <a.div
          style={{
            opacity,
            height: ref.current ? `${ref.current.offsetHeight}px` : 'auto',
            transform: opacity.to(o => `
              skewX(${(1 - o) * -10}deg)
            `),
            pointerEvents: active ? 'auto' : 'none'
          }}
        >
          <Link
            ref={ref}
            className="HomeLink"
            to={current ? '/' : to}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onTouchEnd={onPointerLeave}
            onPointerDown={onPointerLeave}
            style={{
              touchAction: 'none'
            }}
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
                <SymbolComponent
                  style={{
                    ...symbolStyle
                  }}
                />
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
      </a.div>
    </div>
  );
}

