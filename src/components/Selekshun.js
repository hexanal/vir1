import { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { useControls, button } from 'leva';

import useRaf from '../hooks/useRaf';
import useKeys from '../hooks/useKeys';
import usePointer from '../hooks/usePointer';
// import useFart from '../hooks/useFart';

import Graph from './Graph';
// import Scanner from './Scanner';
// import BiAxialScanner from './BiAxialScanner';
// import BiAxialControls from './BiAxialControls';

export default function Selekshun(props) {
  const ref = useRef();
  const relativeTo = [
    ref.current ? ref.current.offsetWidth : 0,
    ref.current ? ref.current.offsetHeight : 0,
  ];
  const [relx = 0, rely = 0] = relativeTo || [];
  const { t } = useRaf();
  const { pointers, mouse } = usePointer({
    // origin: [relx/2, rely/2],
    max: [relx, rely]
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
  const [rx, ry] = ratio || [];
  const [dx, dy] = displace || [];

  const selected = useRef(null);

  const selection = useMemo(() => {
    if (!x || !y || !x0 || !y0) {
      return null;
    }

    // console.table({
    //   zero: [x0, y0],
    //   ratio: [rx, ry],
    // });

    const s = [x0 * 100, y0 * 100];
    const e = [rx * 100, ry * 100];
    const points = [
      [s[0], s[1]],
      [e[0], s[1]],
      [e[0], e[1]],
      [s[0], e[1]],
    ];
    const path = `
      M ${points[0].join(',')}
      L ${points[1].join(',')}
      L ${points[2].join(',')}
      L ${points[3].join(',')}
      z
    `;

    return {
      start: s,
      end: e,
      points,
      path,
    };
  }, [pointers, x0, y0, rx, ry]);

  useEffect(() => {
    if (selection) {
      selected.current = {...selection};
    }
  }, [selection]);

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `100%`,
        height: `100%`,
      }}
    >
      <div>
        <Graph>
          <text
            x={0}
            y={2}
            stroke="none"
            style={{font: '1px monospace'}}
          >
            experiment: drawing a selection rectangle
          </text>
          {selection ? (
            <>
              <text
                x={selection.end[0]}
                y={selection.end[1]}
                stroke="none"
                style={{font: '1px monospace'}}
              >
                {`[${selection.start[0]},${selection.start[1]}]`}
              </text>

              <text
                x={selection.end[0]}
                y={selection.end[1] + 2}
                stroke="none"
                style={{font: '1px monospace'}}
              >
                {`[${selection.end[0]},${selection.end[1]}]`}
              </text>
            </>
          ):null}

          {selected.current ? (
            <path
              style={{
                stroke: 'none',
                fill: `rgb(0 0 0 / 0.1)`,
                // transform: `
                //   translate(${rx}%, ${ry}%)
                // `,
              }}
              d={selected.current.path}
            />
          ): null}

          {selection ? (
            <path
              style={{
                stroke: 'rgb(255 0 255 / 1)',
                fill: `rgb(0 0 0 / 0)`,
                // transform: `
                //   translate(${rx}%, ${ry}%)
                // `,
              }}
              d={selection.path}
              vectorEffect="non-scaling-stroke"
            />
          ): null}

        </Graph>
      </div>
    </div>
  );
};

