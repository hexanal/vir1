import { useCallback, useEffect, useRef, useState } from "react";
import { useSpring, animated as a } from "@react-spring/web";

export default function HeightToggle(props) {
  const {
    // elementRef = null,
    children = null,
    toggled = false,
  } = props || {};
  const ref = useRef(null);

  const [{ toggle }, springApi] = useSpring(
    () => ({
      toggle: toggled,
      config: { tension: 350, friction: 20 },
    }),
    []
  );

  useEffect( () => {
    console.log( ref.current.offsetHeight );
    springApi.start({
      toggled: toggled ? 1 : 0,
      config: {
        tension: toggled ? 100 : 300,
        friction: toggled ? 10 : 20,
      }
    });
  }, [toggled]);

  return (
    <a.div
      style={{
        position: 'relative',
        zIndex: 4,
        display: 'block',
        width: '100%',
        height: ref.current !== null ? toggle.to(o => `${o * ref.current.offsetHeight}px`) : 'auto',
        overflow: 'hidden',
      }}
    >
      <a.div
        style={{
          height: ref.current !== null ? `${ref.current.offsetHeight}px` : 'auto',
          pointerEvents: toggled ? 'auto' : 'none'
        }}
      >
        <div ref={ref}>
          {children}
        </div>
      </a.div>
    </a.div>
  );
}

