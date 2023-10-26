import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSpring, animated as a } from "@react-spring/web";

import useRaf from "../hooks/useRaf";

import HomeMenu from "./HomeMenu";

// import CanvasGrid from "../experiments/CanvasGrid";

import "./Home.css";

function Home() {
  const { pathname }  = useLocation();

  useEffect( () => {
    document.title = 'fredmercy';
  }, []);

  const [{ weird }, weirdApi] = useSpring(
    () => ({
      weird: 0,
      config: { tension: 180, friction: 20 },
    }),
    []
  );

  useEffect( () => {
    if (pathname === '/') {
      weirdApi.start({
        weird: 1,
      });
    } else {
      weirdApi.start({
        weird: 0,
      });
    }
  }, [pathname, weirdApi]);

  return <div
    className="Home"
  >
    {/* <CanvasGrid /> */}

    <div
      className="Home__heading"
    >
      <a.h1
        style={{
          display: 'inline-block',
          transformOrigin: '0 0',
          transform: weird.to(w => `
            translateY(${(1-w) * 200}%)
            skewY(${(1-w) * 30}deg)
          `)
        }}
      >
        fredmercy.ca
      </a.h1>
    </div>

    <HomeMenu />

    <div>
      <Outlet />
    </div>

  </div>
}

export default Home;
