import { useCallback, useState, useEffect, useRef } from 'react';
import { useControls, button } from 'leva';
import useRaf from '../hooks/useRaf';
import useKeys from '../hooks/useKeys';
import useGamepads from '../hooks/useGamepads';
import useFart from '../hooks/useFart';
import usePointer from '../hooks/usePointer';
import Graph from './Graph';
import BiAxialControls from './BiAxialControls';

export default function SomeControls(props) {
  const { keys } = useKeys();
  const { gamepads, getGamepadInputs } = useGamepads();
  const { leftStick = null, rightStick = null, buttonDown = null } = getGamepadInputs(0) || {};
  const { pointers, mouse } = usePointer();
  const { position: mousePosition } = mouse || {};
  const [mouseX = 0, mouseY = 0] = mousePosition || [];
  const { t } = useRaf();

  // const { position, eased } = useFart({ force: force.current, mass: MASS });
  // const [x, y, z] = position || [];
  // const [fx, fy, fz] = force.current || [];

  const [fuck, setFuck] = useState([0, 0]);
  const [x, y] = fuck || [];

  const onBiAxialControlChange = useCallback( coords => {
    setFuck(coords);
  }, [setFuck]);

  const onBiAxialControlChangeVersion2 = useCallback( coords => {
    const [dx = 0, dy = 0] = coords || [];
    setFuck(f => [f[0] + dx, f[1] + dy]);
  }, [setFuck]);

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
        <BiAxialControls
          size={[3,3]}
          multiplier={100}
          onChange={onBiAxialControlChange}
        />

        <br />
        <br />

        <BiAxialControls
          size={[3,3]}
          multiplier={1}
          onChange={onBiAxialControlChangeVersion2}
          withSnapBack
        />
      </div>

      <Graph>
        <text
          x={51}
          y={2}
          stroke="none"
          style={{font: '1px monospace'}}
        >
          experiment:
        </text>
        <text
          x={51}
          y={4 + Math.sin(t * 0.0025) * 0.5}
          stroke="none"
          style={{font: '1px monospace'}}
        >
          “bi-axial controls” to move shit
        </text>
        <circle
          cx={x + 50}
          cy={y + 50}
          r={2}
          fill={`rgb(42 42 128 / 1)`}
          stroke={`none`}
        />
      </Graph>
    </div>
  );
};

