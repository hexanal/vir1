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

const FORCE = 0.005;
const MASS = 84;

export default function TrajB(props) {
  const force = useRef([0, 0, 0]);
  const { keys } = useKeys();
  const { gamepads, getGamepadInputs } = useGamepads();
  const { leftStick = null, rightStick = null, buttonDown = null } = getGamepadInputs(0) || {};
  const [xAxisLeft = 0, yAxisLeft = 0] = leftStick || [];
  const [xAxis = 0, yAxis = 0] = rightStick || [];
  const { pointers, mouse } = usePointer();
  const { position: mousePosition } = mouse || {};
  const [mouseX = 0, mouseY = 0] = mousePosition || [];
  const { t } = useRaf();

  function forceFromPointers(p) {
    const primary = p[0];
    const { position, displace } = primary || {};
    const [x = 0, y = 0] = displace || [];

    return [x, y];
  }

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

    const [pfx = 0, pfy = 0] = forceFromPointers(pointers);

    nfx += pfx * 0.001;
    nfy += pfy * 0.001;

    force.current = [nfx, nfy, nfz];
  }, [keys, xAxis, yAxis, pointers, FORCE]);

  const { position, eased } = useFart({ force: force.current, mass: MASS });
  const [x, y, z] = position || [];
  const [fx, fy, fz] = force.current || [];

  const scanners = [
    {
      label: 'dots',
      component: (
        <Scanner
          use={20 * Math.sin(Math.tan(t * 0.002) * 0.01)}
          offset={50}
          size={[30,5]}
          history={64}
          indicator="dot"
          withValue
        />
      )
    },
    {
      label: 'dots (weirder)',
      component: (
        <Scanner
          // use={Math.sin(t * 0.0025)}
          use={0.5 * Math.sin(t * 0.007) * 1 / Math.cos(t * 0.001)}
          offset={50}
          size={[10,3]}
          history={12}
          indicator="dot"
          withValue
        />
      )
    },
    {
      label: 'dots',
      component: (
        <Scanner
          // use={Math.sin(t * 0.0025)}
          use={Math.cos(t * 0.004)}
          offset={50}
          size={[10,3]}
          history={16}
          indicator="dot"
        />
      )
    },
    {
      label: 'wireframes',
      component: (
        <Scanner
          use={Math.sin(t * 0.005)}
          offset={50}
          size={[10,3]}
          history={64}
          indicator="wire"
        />
      )
    },
    {
      label: 'plain',
      component: (
        <Scanner
          use={Math.sin(t * 0.005)}
          offset={50}
          size={[10,3]}
          history={64}
        />
      )
    },
    {
      label: 'control?',
      component: (
        <BiAxialControls
          size={[3,3]}
        />
      )
    },
    {
      label: 'gamepad left-stick axes',
      component: (
        <BiAxialScanner
          x={xAxisLeft}
          y={yAxisLeft}
          size={[3,3]}
          history={16}
        />
      )
    },
    {
      label: 'gamepad right-stick axes',
      component: (
        <BiAxialScanner
          x={xAxis}
          y={yAxis}
          size={[3,3]}
          history={16}
        />
      )
    },
    {
      label: 'force, x3 magnification',
      component: (
        <BiAxialScanner
          x={fx * 3}
          y={fy * 3}
          size={[3,3]}
        />
      )
    },
    {
      label: 'keypresses',
      component: (
        <Scanner
          use={keys.length ? 1 : 0}
          history={256}
          size={[8,2]}
        />
      ),
    },
    {
      label: 'pointer presses',
      component: (
        <Scanner
          use={pointers.length ? 1 : 0}
          history={256}
          size={[8,2]}
        />
      ),
    },
    {
      label: 'mouse, ratio, from center',
      component: (
        <BiAxialScanner
          x={mouseX / window.innerWidth - 0.5}
          y={mouseY / window.innerHeight - 0.5}
          size={[3,3]}
          indicator="wire"
        />
      ),
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

