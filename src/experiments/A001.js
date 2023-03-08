import { useState, useEffect } from 'react';
import usePointer from '../hooks/usePointer.js';
import useKeys from '../hooks/useKeys.js';
import useRaf from '../hooks/useRaf.js';
import { useControls }  from 'leva';

import Logger from '../components/viz/Logger';
import Graph from '../components/viz/Graph';

function control(others = {}) {
  return {
    value: 0,
    min: -100,
    max: 100,
    step: 1,
    ...others
  };
}

export default function A001(props) {
  const {
    snapshotDuration,
    tickFactor,
    mass
  } = useControls({
    snapshotDuration: {
      value: 5000,
      min: 500,
      max: 10000,
      step: 500,
    },
    tickFactor: {
      value: 50,
      min: 10,
      max: 1000,
      step: 1,
    },
    mass: {
      value: 1,
      min: 1,
      max: 10000,
      step: 10,
    }
  });
  const { keys } = useKeys();
  const { pointers, mouse } = usePointer({
    origin: [
      window.innerWidth / 2,
      window.innerHeight / 2
    ]
  });
  const { position: mousePosition } = mouse || {};
  const [x, y] = mousePosition || [];
  const { t, elapsed } = useRaf();

  const [t0, setT0] = useState(null);
  const [t1, setT1] = useState(null);
  const [tick, setTick] = useState(null);
  const [points, setPoints] = useState([]);

  useEffect( () => {
    if (keys.includes('a') && t0 === null) {
      setT0(Date.now());
      setT1(Date.now() + snapshotDuration);
      setTick(0);
    }

    if (keys.includes('s')) {
      setPoints([]);
    }
  }, [keys, snapshotDuration, t0, setT0, setT1, setTick, setPoints]);

  useEffect( () => {
    if (t0 === null || t1 === null) {
      return;
    }

    const dt0 = t - t0;
    const dt1 = t1 - t;

    if (dt0 > 0) {
      setTick(Math.floor(dt0 / tickFactor));
    }

    if (dt1 < 0) {
      setT0(null);
      setT1(null);
      setTick(null);
    }
  }, [t, t0, setT0, setT1, setTick, tickFactor]);

  useEffect( () => {
    if (tick !== null ) {
      setPoints(p => {
        const {
          x: prevX = null,
          y: prevY = null,
          vx: prevVX = null,
          vy: prevVY = null,
        } = p[tick - 1] || {};
        const pointX = 50 + (x / window.innerHeight * 100);
        const pointY = 50 + (y / window.innerHeight * 100);
        const dx = prevX !== null ? pointX - prevX : 0;
        const dy = prevY !== null ? pointY - prevY : 0;
        const vx = dx / tickFactor;
        const vy = dy / tickFactor;
        const ax = prevVX !== null ? (vx - prevVX) / tickFactor : 0;
        const ay = prevVY !== null ? (vy - prevVY) / tickFactor : 0;
        const kx = mass * (vx ** 2) * (vx < 0 ? -1 : 1);
        const ky = mass * (vy ** 2) * (vy < 0 ? -1 : 1);

        p[tick] = {
          x: pointX,
          y: pointY,
          prevX,
          prevY,
          dx,
          dy,
          vx,
          vy,
          ax,
          ay,
          kx,
          ky,
        };

        return p;
      });
    }
  }, [tick, x, y, setPoints, tickFactor]);

  // ufx
  // ucb
  // ust
  // urf

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        cursor: 'crosshair'
      }}
    >
      <Logger use={{
        t, t0, t1, tick, elapsed
      }} />

      <Graph>
        {points.map(({x, y, prevX, prevY, dx, dy, vx, vy, ax, ay, kx, ky}, i) => {
          return (
            <g key={`${x}-${y}-${i}`}>
              <line
                stroke="rgb(0 0 0 / 0.5)"
                x1={prevX}
                x2={x}
                y1={prevY}
                y2={y}
                vectorEffect="non-scaling-stroke"
              />
              <line
                stroke="rgb(0 0 255 / 1)"
                x1={x}
                x2={x + ax}
                y1={y}
                y2={y + ay}
                vectorEffect="non-scaling-stroke"
              />
              <line
                stroke="rgb(255 0 255 / 1)"
                x1={x}
                x2={x + kx}
                y1={y}
                y2={y + ky}
                vectorEffect="non-scaling-stroke"
              />
              {1 === 0 ?
                <line
                  stroke="rgb(255 0 0 / 1)"
                  x1={x}
                  x2={x + dx}
                  y1={y}
                  y2={y + dy}
                  vectorEffect="non-scaling-stroke"
                />
              : null}
              <circle
                cx={x}
                cy={y}
                // cx={x + Math.sin(t * 0.005 + i * 0.1)}
                // cy={y + Math.cos(t * 0.005 + i * 0.1)}
                r={0.25}
                fill="rgb(0 0 0 / 1)"
                stroke="none"
              />
            </g>
          );
        })}
      </Graph>
    </div>
  );
};
