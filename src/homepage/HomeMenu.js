import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useResize, useSpring, animated as a } from "@react-spring/web";

import HomeLink from "./HomeLink";
import Circle from "./symbols/Circle";
import Star from "./symbols/Star";
import Wave from "./symbols/Wave";

function HomeMenu() {
  const { pathname }  = useLocation();

  const [{ weird }, weirdApi] = useSpring(
    () => ({
      weird: 0,
      config: { tension: 350, friction: 20 },
    }),
    []
  );

  const weirdTransform = useCallback(w => {
    const h = window.innerHeight;
    const v = h / 2 * (1-w);

    return `
      translate(-50%, ${v}px)
      translateY(${(1-w) * -50}%)
    `;
  }, []);

  useEffect( () => {
    if (pathname === '/') {
      weirdApi.start({
        weird: 0,
      });
    }
    if (pathname === '/code' || pathname === '/art' || pathname === '/art/' || pathname === '/other') {
      weirdApi.start({
        weird: 1,
      });
    }
  }, [pathname, weirdApi]);

  return <div
    style={{
      position: 'fixed',
      zIndex: 100,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
    }}
  >
    <a.div
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: weird.to(weirdTransform)
      }}
      className="Home__links"
    >
      <HomeLink
        active={pathname === '/code' || pathname === '/'}
        current={pathname === '/code'}
        to="/code"
        prefix="I"
        symbol={Circle}
        symbolStyle={{
          width: '4rem',
          height: '4rem',
        }}
        label="code"
        color={`rgb(255 0 255 / 1)`}
      />

      <HomeLink
        active={pathname === '/art' || pathname === '/art/'  || pathname === '/'}
        current={pathname === '/art' || pathname === '/art/' }
        to="/art"
        prefix="II"
        symbol={Star}
        symbolStyle={{
          width: '10rem',
          height: '5rem',
        }}
        label="art"
        color={`rgb(0 255 255 / 1)`}
      />
      <HomeLink
        active={pathname === '/other' || pathname === '/'}
        current={pathname === '/other'}
        to="/other"
        prefix="III"
        symbol={Wave}
        symbolStyle={{
          width: '6rem',
          height: '5rem',
        }}
        label="other"
        color={`rgb(255 255 0 / 1)`}
      />
    </a.div>
  </div>
}

export default HomeMenu;

