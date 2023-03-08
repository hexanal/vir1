import { useCallback, useState, useEffect, useRef } from 'react';
import { useControls, button } from 'leva';
import useRaf from '../hooks/useRaf';
import useKeys from '../hooks/useKeys';
import useGamepads from '../hooks/useGamepads';
// import useFart from '../hooks/useFart';
import usePointer from '../hooks/usePointer';
import useCollision from '../hooks/useCollision';

import BiAxialControls from '../components/BiAxialControls';
import FunkControl from '../components/FunkControl';
import BiAxialScanner from '../components/viz/BiAxialScanner';
import Graph from '../components/viz/Graph';
import Scanner from '../components/viz/Scanner';

export default function SomeControls(props) {
  const { keys } = useKeys();
  const { gamepads, getGamepadInputs } = useGamepads();
  const { leftStick = null, rightStick = null, buttonDown = null } = getGamepadInputs(0) || {};
  const { pointers, mouse } = usePointer();
  const { position: mousePosition } = mouse || {};
  const { position } = pointers[0] || {};
  const [interactX = 0, interactY = 0] = position || [];
  const [mouseX = 0, mouseY = 0] = mousePosition || [];
  const { t } = useRaf();

  // const { position, eased } = useFart({ force: force.current, mass: MASS });
  // const [x, y, z] = position || [];
  // const [fx, fy, fz] = force.current || [];

  // useVariableControl
  // ...
  // {
  //    name (!string)
  //      camelcase
  //    label (string)
  //      null *
  //    type
  //      fader
  //        wide (bool)
  //          true *
  //        wheel (bool)
  //          false *
  //        min (number)
  //           null *
  //        max (number)
  //          null *
  //        mini (bool)
  //          false *
  //        lockPointer (bool)
  //        ticks?
  //        labelPosition
  //          left *
  //          top
  //        ...
  // }
  const OFFSET = useRef(100);
  const HISTORY = useRef(32);
  const SIZE = useRef([10, 2]);

  const [fuck, setFuck] = useState([0, 0]);
  const [x, y] = fuck || [];

  const onBiAxialControlChange = useCallback( coords => {
    setFuck(coords);
  }, [setFuck]);

  const onBiAxialControlChangeVersion2 = useCallback( coords => {
    const [dx = 0, dy = 0] = coords || [];
    setFuck(f => [f[0] + dx, f[1] + dy]);
  }, [setFuck]);

  const onBiAxialControlChangeVersion3 = useCallback( coords => {
    const [dx = 0, dy = 0] = coords || [];

    OFFSET.current = dx;
    HISTORY.current = dy;
  }, []);

  const onFunkControl1Change = useCallback( val => {
    HISTORY.current = val;
  }, []);

  const onHistoryChange = useCallback( val => {
    HISTORY.current = val;
  }, []);
  const onOffsetChange = useCallback( val => {
    OFFSET.current = val;
  }, []);

  const ref = useRef(null);
  const { hit, isInside } = useCollision({
    ref,
    cursor: [interactX, interactY],
  });

  useEffect(() => {
    console.table({isInside});
  }, [interactX, interactY]);

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
          {/* withValue={false} */}

        <br />
        <br />

        <BiAxialControls
          size={[3,3]}
          multiplier={1}
          onChange={onBiAxialControlChangeVersion2}
          withSnapBack
        />

        <br />
        <br />

        <div
          style={{
            fontSize: '0.8rem',
          }}
        >
          <div
            style={{
              width: '5rem',
              backgroundColor: 'rgb(0 0 0 / 0.05)',
            }}
          >
            <label>
              Number of history
            </label>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'stretch',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '5rem',
                color: 'rgb(255 255 255 / 1)',
                backgroundColor: 'rgb(0 0 0 / 1)',
              }}
            >
              100
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '1.5rem',
                color: 'rgb(255 255 255 / 1)',
                backgroundColor: 'rgb(0 0 0 / 1)',
              }}
            >
              px
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '5rem',
                color: 'rgb(255 255 255 / 1)',
                backgroundColor: 'rgb(255 64 0 / 1)',
              }}
            >
              <svg
                ref={ref}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                // preserveAspectRatio="none"
                style={{
                  width: '5rem',
                  height: '1.5rem',
                  // stroke: 'rgb(0 0 0 / 1)',
                  // strokeWidth: '1px',
                }}
              >
              </svg>
            </div>
          </div>
        </div>

        <br />
        <br />

        <FunkControl
          value={OFFSET.current}
          multiplier={100}
          onChange={onFunkControl1Change}
        />

        <br />
        <br />

        <Scanner
          label={`mouse x, scanner is controlled by the thing above ↑`}
          use={mouseX}
          processor={n => n * -2 / window.innerWidth}
          offset={OFFSET.current}
          history={HISTORY.current}
          size={SIZE.current}
          linecolor={`rgb(0 0 255 / 1`}
          withValue
        />
        <Scanner
          label={`mouse y`}
          use={mouseY}
          processor={n => n * -2 / window.innerHeight}
          offset={OFFSET.current}
          history={HISTORY.current}
          size={SIZE.current}
          linecolor={`rgb(0 255 255 / 1`}
          withValue
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

