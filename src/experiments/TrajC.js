import { useCallback, useState, useEffect, useRef } from 'react';
import { useControls, button } from 'leva';

import useRaf from '../hooks/useRaf';
import useKeys from '../hooks/useKeys';
import useGamepads from '../hooks/useGamepads';
import useFart from '../hooks/useFart';
import usePointer from '../hooks/usePointer';

import BiAxialControls from '../components/BiAxialControls';
import BiAxialScanner from '../components/viz/BiAxialScanner';
import Graph from '../components/viz/Graph';
import Scanner from '../components/viz/Scanner';

const MASS = 84;

export default function TrajC(props) {
  const { keys } = useKeys();
  const { gamepads, getGamepadInputs } = useGamepads();
  const { leftStick = null, rightStick = null, buttonDown = null } = getGamepadInputs(0) || {};
  const [xAxisLeft = 0, yAxisLeft = 0] = leftStick || [];
  const [xAxis = 0, yAxis = 0] = rightStick || [];
  const { pointers, mouse } = usePointer({
    origin: [window.innerWidth/2, window.innerHeight/2],
    max: [window.innerWidth, window.innerHeight]
  });
  const { position: mousePosition } = mouse || {};
  const [mouseX = 0, mouseY = 0] = mousePosition || [];
  const { t } = useRaf();

  const {
    position: primaryPointerPosition,
    ratio = 0,
    distanceRatioFromCenter,
  } = pointers[0] || [];
  const [pointerX, pointerY] = primaryPointerPosition || [];

  const scanners = [
    {
      label: 'ratio x y',
      component: (
        <BiAxialScanner
          x={ratio[0]}
          y={ratio[1]}
          indicator="wire"
        />
      )
    },
    {
      label: 'position x',
      component: (
        <Scanner
          id="distance from center"
          use={ratio[0]}
          indicator="bar"
          offset={50}
          size={[15, 1.5]}
        />
      )
    },
    {
      label: 'position y',
      component: (
        <Scanner
          id="distance from center"
          use={ratio[1]}
          indicator="bar"
          offset={50}
          size={[15, 1.5]}
        />
      )
    },
    {
      label: 'keys',
      component: (
        <Scanner
          use={keys.length}
          scaleFactor={1/2}
          size={[12,2]}
          indicator="bar"
          withValue
          revert
        />
      )
    },
  ];

  return (
    <div>
      <div
        style={{
          zIndex: 3,
          position: 'absolute',
          top: '1rem',
          left: '1rem',
        }}
      >
        {scanners.map(scanner => {
          const {
            label = '—',
            component,
          } = scanner || {};

          return (
            <div
              key={label}
              style={{
                marginBottom: '1rem'
              }}
            >
              <pre
                style={{
                  marginBottom: '0.5rem',
                  fontSize: '0.75rem',
                }}
              >
                {label}
              </pre>
              {component}
            </div>
          );
        })}
      </div>
    </div>
  );
};

