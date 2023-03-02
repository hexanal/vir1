import { useCallback, useState, useEffect, useRef } from 'react';
import { useControls, button } from 'leva';
import useRaf from '../hooks/useRaf';
import useKeys from '../hooks/useKeys';
import useGamepads from '../hooks/useGamepads';
import useFart from '../hooks/useFart';
import Graph from './Graph';

export default function TrajA(props) {
  const {
    SHOW_LOGS,
    RED_BALL,
    YELLOW_BALL,
    FORCE,
    MASS
  } = useControls({
    SHOW_LOGS: true,
    RED_BALL: true,
    YELLOW_BALL: true,
    MASS: {
      value: 75,
      min: 1,
      max: 1000,
      step: 1,
    },
    FORCE: {
      value: 0.05,
      min: -2,
      max: 2,
      step: 0.01,
    },
  });

  const force = useRef([0, 0, 0]);
  const { keys } = useKeys();
  const { gamepads, getGamepadInputs } = useGamepads();
  const { rightStick = null, buttonDown = null } = getGamepadInputs(0) || {};
  const [xAxis = 0, yAxis = 0] = rightStick || [];

  useEffect(() => {
    let nfx = 0;
    let nfy = 0;
    let nfz = 0;

    if (keys.includes('w')) {
      nfy -= FORCE;
    }
    if (keys.includes('a')) {
      nfx -= FORCE;
    }
    if (keys.includes('s')) {
      nfy += FORCE;
    }
    if (keys.includes('d')) {
      nfx += FORCE;
    }

    nfx += FORCE * (Math.abs(xAxis) < 0.05 ? 0 : xAxis);
    nfy += FORCE * (Math.abs(yAxis) < 0.05 ? 0 : yAxis);

    force.current = [nfx, nfy, nfz];
  }, [keys, xAxis, yAxis, FORCE]);

  const { position, eased } = useFart({ force: force.current, mass: MASS });
  const [x, y, z] = position || [];
  const [ex, ey, ez] = eased || [];
  const [fx, fy, fz] = force.current || [];

  const x1 = 50 + x;
  const x2 = 50 + x + fx * MASS;
  const y1 = 50 + y;
  const y2 = 50 + y + fy * MASS;
  // TODO vector components, angle, etc.
  // const dx = x1 - x2;
  // const dy = y1 - y2;
  // const f = Math.sqrt(dx**2 + dy**2);
  // const theta = Math.atan2(dy, dx);
  // const lx = f * Math.cos(theta);
  // const ly = f * Math.sin(theta);

  return (
    <Graph>
      {SHOW_LOGS ? (
        <>
          <text x={0} y={3} style={{fontSize: 2, stroke: 'none' }}>target: [{x}, {y}, {z}]</text>
          <text x={0} y={6} style={{fontSize: 2, stroke: 'none' }}>eased: [{ex}, {ey}, {ez}]</text>
          <text x={0} y={9} style={{fontSize: 2, stroke: 'none' }}>force: [{fx}, {fy}, {fz}]</text>
          <text x={0} y={12} style={{fontSize: 2, stroke: 'none' }}>gamepad axes: [{xAxis}, {yAxis}]</text>
        </>
      ): null}

      {RED_BALL ? (
        <circle
          cx={50 + x}
          cy={50 + y}
          r={5}
          fill="rgb(255 0 0 / 1)"
          stroke="none"
          style={{
            transform: `translateZ(${z}px)`
          }}
        />
      ): null}

      {YELLOW_BALL ? (
      <circle
        cx={50 + ex}
        cy={50 + ey}
        r={2}
        fill="rgb(255 255 0 / 1)"
        stroke="none"
        style={{
          transform: `translateZ(${z}px)`
        }}
      />
      ):null}

      <line
        x1={x1}
        y1={y1}
        x2={x2 + (x2 - (50 + ex))}
        y2={y2 + (y2 - (50 + ey))}
        stroke="rgb(0 255 255 / 1)"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />

      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="rgb(0 0 0 / 1)"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </Graph>
  );
};

//
//      <circle
//        cx={50 + ballX}
//        cy={50 + ballY}
//        r={5}
//        fill="rgb(255 0 0 / 1)"
//        stroke="none"
//      />
//      <circle
//        cx={50 + forceX}
//        cy={50 + forceY}
//        r={2}
//        fill="rgb(255 255 0 / 1)"
//        stroke="none"
//      />
