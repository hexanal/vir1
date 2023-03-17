import { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { useControls, button } from 'leva';

import useRaf from '../hooks/useRaf';
import useKeys from '../hooks/useKeys';
import usePointer from '../hooks/usePointer';
import useCollision from '../hooks/useCollision';

import Graph from '../components/viz/Graph';
import Scanner from '../components/viz/Scanner';

export default function Selekshun(props) {
  const ref = useRef();
  const { t } = useRaf();

  const { pointers, mouse } = usePointer({
    // origin: [relx/2, rely/2],
    // max: [relx, rely]
  });
  const { position: mousePosition } = mouse || {};
  const [mouseX = 0, mouseY = 0] = mousePosition || [];
  const { keys } = useKeys();

  const [tool, setTool] = useState('select');

  const {
    position,
    ratio = 0,
    displace,
    start,
    ratioStart,
    distanceRatioFromCenter,
  } = pointers[0] || [];
  const [x0, y0] = ratioStart || [];
  const [x, y] = position || [];
  const [dx, dy] = displace || [];

  const { hit } = useCollision({
    ref,
    coords: [x, y]
  });

  const startHit = useRef(null);
  const selected = useRef(null);
  const selection = useRef(null);

  useEffect(() => {
    if (hit === null) {
      startHit.current = null;
      return;
    }

    const end = [hit[0], hit[1]];

    const start = startHit.current !== null
      ? startHit.current
      : end;

    startHit.current = start;

    const points = [
      [start[0], start[1]],
      [end[0], start[1]],
      [end[0], end[1]],
      [start[0], end[1]],
    ];
    const path = `
      M ${points[0].join(',')}
      L ${points[1].join(',')}
      L ${points[2].join(',')}
      L ${points[3].join(',')}
      z
    `;

    const d = {
      start,
      end,
      points,
      path,
    };

    selection.current = x && y ? d : null;
    selected.current = d;
  }, [x, y]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `100%`,
        height: `100%`,
      }}
    >
      <div>
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
          }}
        >
          <Scanner
            label={`hit x: `}
            use={hit ? hit[0] : 0}
            processor={n => n / 100 * -2}
            offset={100}
            history={16}
            size={[5,5]}
            linecolor={`rgb(0 255 0 / 1`}
            withValue
          />
          <Scanner
            label={`hit y: `}
            use={hit ? hit[1] : 0}
            processor={n => n / 100 * -2}
            offset={100}
            history={16}
            size={[5,5]}
            linecolor={`rgb(255 0 0 / 1`}
            withValue
          />
        </div>

        <Graph
          ref={ref}
        >
          <text
            x={0}
            y={2}
            stroke="none"
            style={{font: '1px monospace'}}
          >
            experiment: drawing a selection rectangle
          </text>
          {selection.current ? (
            <>
              <text
                x={selection.current.end[0]}
                y={selection.current.end[1]}
                stroke="none"
                style={{font: '1px monospace'}}
              >
                {`[${selection.current.start[0]},${selection.current.start[1]}]`}
              </text>

              <text
                x={selection.current.end[0]}
                y={selection.current.end[1] + 2}
                stroke="none"
                style={{font: '1px monospace'}}
              >
                {`[${selection.current.end[0]},${selection.current.end[1]}]`}
              </text>
            </>
          ):null}

          {selected.current ? (
            <path
              style={{
                stroke: 'none',
                fill: `rgb(0 0 0 / 0.1)`,
              }}
              d={selected.current.path}
            />
          ): null}

          {selection.current ? (
            <path
              style={{
                stroke: 'rgb(255 0 255 / 1)',
                fill: `rgb(0 0 0 / 0)`,
              }}
              d={selection.current.path}
              vectorEffect="non-scaling-stroke"
            />
          ): null}

        </Graph>
      </div>
    </div>
  );
};

