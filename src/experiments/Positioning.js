import { v4 as uuidv4 } from 'uuid';
import { Fragment } from 'react';
import  {
  useCallback,
  useState,
  useEffect,
  useRef
} from 'react';

import Graph from '../components/viz/Graph';

import useCollision from '../hooks/useCollision';
import usePointer from '../hooks/usePointer';

import useFaderControl from '../hooks/useFaderControl';
import useSelection from '../hooks/useSelection';

export default function Positioning(props) {
  const [posX, PosXFader] = useFaderControl({
    label: 'X Position',
    value: 0,
    max: window.innerWidth,
  });
  const [posY, PosYFader] = useFaderControl({
    label: 'Y Position',
    value: 0,
    max: window.innerHeight,
  });

  const { pointers } = usePointer();
  const { position, buttons } = pointers[0] || {};
  const [x, y] = position || [];

  const graphRef = useRef(null);
  const { hit } = useCollision({
    ref: graphRef,
    coords: [x, y]
  });
  const [hitX = 0, hitY = 0] = hit || [];

  const {
    selectionPath,
    selectedPath,
    from,
    to,
    selected,
    isSelected,
  } = useSelection({
    coords: buttons === 1 ? hit : null
  });

  // current sel
  const [x1 = 0, y1 = 0] = from || [];
  const [x2 = 0, y2 = 0] = to || [];
  // selected coords
  const [sx1, sy1] = selected !== null ? selected[0] : [];
  const [sx2, sy2] = selected !== null ? selected[2] : [];

  // console.log([x1, y1, x2, y2, sx1, sy1, sx2, sy2]);
  // console.log([x, y]);

  const dots = [
    {
      id: uuidv4(),
      coords: [30, 25],
      fill: `rgb(255 255 0 / 1)`,
    },
    {
      id: uuidv4(),
      coords: [75, 40],
      fill: `rgb(255 0 255 / 1)`,
    },
    {
      id: uuidv4(),
      coords: [34, 20],
      fill: `rgb(0 255 255 / 1)`,
    },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          zIndex: 2,
          top: '1rem',
          left: '1rem',
        }}
      >
      </div>

      <Graph
        ref={graphRef}
        style={{
          position: 'absolute',
          left: '50%',
          width: 'auto',
          height: '100%',
          transform: `
            translateX(-50%)
          `,
        }}
        withoutLines
      >
        <GraphAxes />

        {selectedPath ? (
          <>
            {/*
            <text
              x={sx2}
              y={sy2 + 1}
              style={{
                fontSize: '1px'
              }}
              fill={`rgb(0 0 0 / 1)`}
              stroke={`none`}
            >[{sx1}, {sy1}]</text>
            <text
              x={sx2}
              y={sy2 + 2}
              style={{
                fontSize: '1px'
              }}
              fill={`rgb(0 0 0 / 1)`}
              stroke={`none`}
            >[{sx2}, {sy2}]</text>

            <text
              x={sx2}
              y={sy2 + 3}
              style={{
                fontSize: '1px'
              }}
              fill={`rgb(255 0 0 / 1)`}
              stroke={`none`}
            >[{sx2 - sx1}, {sy2 - sy1}]</text>

            <text
              x={sx2}
              y={sy2 + 4}
              style={{
                fontSize: '1px'
              }}
              fill={`rgb(0 0 0 / 0.5)`}
              stroke={`none`}
            >[{Math.abs(sx2 - sx1)}, {Math.abs(sy2 - sy1)}]</text>
            */}

            <path
              style={{
                stroke: 'none',
                fill: `rgb(0 0 0 / 0.1)`,
              }}
              d={selectedPath}
            />
          </>
        ): null}

        {selectionPath ? (
          <>
            <text
              x={x2}
              y={y2}
              style={{
                fontSize: '1px'
              }}
              fill={`rgb(0 0 0 / 1)`}
              stroke={`none`}
            >[{x1}, {y1}]</text>

            <text
              x={x2}
              y={y2 + 2}
              style={{
                fontSize: '1px'
              }}
              fill={`rgb(0 0 0 / 1)`}
              stroke={`none`}
            >[{x2}, {y2}]</text>


            <path
              style={{
                stroke: 'rgb(255 0 255 / 1)',
                fill: `rgb(0 0 0 / 0)`,
              }}
              d={selectionPath}
              vectorEffect="non-scaling-stroke"
            />
          </>
        ): null}

        {hit ? (
          <circle
            cx={hitX}
            cy={hitY}
            r={2}
            fill={'rgb(0 0 255 / 1)'}
            stroke={'none'}
          />
        ): null}

        {dots.map(d => {
          const { id, coords, fill = 'none' } = d || {};
          const [dotx, doty] = coords || []
          const selected = isSelected(coords);
          const strokeWidth = selected ? 2 : 0;
          const stroke = `rgb(0 0 0 /1)`;

          return (
            <Fragment key={id}>
              <text
                x={dotx - 1}
                y={doty + 3}
                style={{
                  fontSize: '1px'
                }}
                fill={`rgb(0 0 0 / 1)`}
                stroke={`none`}
              >
                {dotx}, {doty}
              </text>

              <circle
                cx={dotx}
                cy={doty}
                r={1}
                fill={fill}
                strokeWidth={strokeWidth}
                vectorEffect={`non-scaling-stroke`}
                stroke={stroke}
              />
            </Fragment>
          );
        })}

      </Graph>
    </div>
  );
};

function GraphAxes() {
  return (
    <>
      {/* x axis  */}
      <line
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        x1={0}
        x2={100}
        y1={50}
        y2={50}
      />
      {/* y axis  */}
      <line
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        x1={50}
        x2={50}
        y1={0}
        y2={100}
      />
    </>
  );
}

