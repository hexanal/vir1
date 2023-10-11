import { useEffect } from "react";
import { Link } from "react-router-dom";

import Circle from "./symbols/Circle";
import Star from "./symbols/Star";
import Wave from "./symbols/Wave";

import CanvasGrid from "../experiments/CanvasGrid";

import "./Home.css";

function HomeLink(props) {
  const {
    label = null,
    prefix = null,
    to = null,
    symbol = '✧',
  } = props || {};

  useEffect( () => {
    document.title = 'fredmercy';
  }, []);

  return (
    <Link className="HomeLink" to={to}>
      { prefix ? (
        <div className="HomeLink__prefix">
          {prefix}
        </div>
      ): null}

      { symbol ? (
        <div className="HomeLink__symbol">
          {symbol}
        </div>
      ): null}

      { label ? (
        <div className="HomeLink__label">
          {label}
        </div>
      ): null}
    </Link>
  );
}

function Home() {

  return <div
    className="Home"
  >
    {/* <CanvasGrid /> */}

    <h1
      className="Home__heading"
    >
      fred mercy
    </h1>

    <div
      className="Home__links"
    >
      <HomeLink
        to="/work"
        prefix="I"
        symbol={(
          <>
            <Circle
              style={{
                width: '4rem',
                height: '4rem',
              }}
            />
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
          </>
        )}
        label="dev."
      />
      <HomeLink
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
          </>
        )}
        label="art."
      />
      <HomeLink
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
    </div>

  </div>
}

export default Home;
