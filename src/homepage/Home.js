import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

import useRaf from "../hooks/useRaf";

import HomeMenu from "./HomeMenu";

// import CanvasGrid from "../experiments/CanvasGrid";

import "./Home.css";

function Home() {

  useEffect( () => {
    document.title = 'fredmercy';
  }, []);

  return <div
    className="Home"
  >
    {/* <CanvasGrid /> */}

    <h1
      className="Home__heading"
    >
      fred mercy
    </h1>

    <HomeMenu />

    <div>
      <Outlet />
    </div>

  </div>
}

export default Home;
