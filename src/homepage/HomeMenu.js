import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useResize, useSpring, animated as a } from "@react-spring/web";

import HomeLink from "./HomeLink";
import Circle from "./symbols/Circle";
import Star from "./symbols/Star";
import Wave from "./symbols/Wave";

function HomeMenu() {
  const { pathname }  = useLocation();
  console.log(pathname);
  // if / => show all
  // if /code => show only code
  // if /art => show only art
  // and so on

  const pages = [
    '/',
    '/code',
    '/art',
    '/other',
  ];

  // position of menu
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
      console.log('home, set menu to center');
      weirdApi.start({
        weird: 0,
      });
    }
    if (pathname === '/code' || pathname === '/art' || pathname === '/other') {
      console.log('code page, set menu to top, hide other links?');
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
        to="/code"
        prefix="I"
        symbol={(
          <>
            <Circle
              style={{
                width: '4rem',
                height: '4rem',
              }}
            />
            {/*
            <Circle
              stroke={`rgb(255 0 255 / 1)`}
              style={{
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: '50%',
                // transformOrigin: `center 0`,
                transform: `
                  translateX(-50%)
                  scale(1.2)
                `,
                width: '4rem',
                height: '4rem',
                mixBlendMode: 'overlay',
              }}
            />
            <Circle
              stroke={`rgb(0 255 255 / 1)`}
              style={{
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: '50%',
                // transformOrigin: `center 0`,
                transform: `
                  translateX(-50%)
                  scale(1.5)
                `,
                width: '4rem',
                height: '4rem',
                mixBlendMode: 'overlay',
              }}
            />
            */}
          </>
        )}
        label="code"
      />

      <HomeLink
        active={pathname === '/art' || pathname === '/'}
        to="/art"
        prefix="II"
        symbol={(
          <>
            <Star
              style={{
                width: '10rem',
                height: '5rem',
              }}
            />
            {/*
            <Star
              stroke={`rgb(255 255 0 / 1)`}
              style={{
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: '50%',
                // transformOrigin: `center 0`,
                transform: `
                  translateX(-50%)
                  scale(1.2)
                `,
                width: '10rem',
                height: '5rem',
                mixBlendMode: 'overlay',
              }}
            />
            <Star
              stroke={`rgb(100 255 50 / 1)`}
              style={{
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: '50%',
                // transformOrigin: `center 0`,
                transform: `
                  translateX(-50%)
                  scale(1.5)
                `,
                width: '10rem',
                height: '5rem',
                mixBlendMode: 'overlay',
              }}
            />
            */}
          </>
        )}
        label="art"
      />
      <HomeLink
        active={pathname === '/other' || pathname === '/'}
        to="/other"
        prefix="III"
        symbol={(
          <Wave
            style={{
              width: '6rem',
              height: '5rem',
            }}
          />
        )}
        label="other"
      />
    </a.div>
  </div>
}

export default HomeMenu;

