import { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { useControls, button } from 'leva';

import useRaf from '../hooks/useRaf';
import useKeys from '../hooks/useKeys';
import usePointer from '../hooks/usePointer';
import useCollision from '../hooks/useCollision';

import Graph from '../components/viz/Graph';

// TODO to a hook / hookify
// blah blah
export default function HitsOnly(props) {
  const ref = useRef();
  const { t } = useRaf();
  const { pointers, mouse } = usePointer({
    // origin: [],
    // max: []
  });
  const { position: mousePosition } = mouse || {};
  const [mouseX = 0, mouseY = 0] = mousePosition || [];

  const { position, } = pointers[0] || {};
  const [x, y] = position || [];

  const { hit } = useCollision({
    ref,
    cursor: [x,y],
  });

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        bottom: '1rem',
        right: '1rem',
        width: '50%',
        // height: '20%',
        cursor: x && y ? 'crosshair' : 'default'
      }}
    >
    <Graph
      style={{
        cursor: x && y ? 'crosshair' : 'default'
      }}
    >
      {hit !== null ? (
        <text
          x={51}
          y={3}
          stroke="none"
          style={{font: '1px monospace'}}
        >
          {hit[0]}, {hit[1]}
        </text>
      ):null}

      {x && y  ? (
        <text
          x={30}
          y={3}
          stroke="none"
          style={{font: '1px monospace'}}
        >
          {x}, {y}
        </text>
      ):null}

      <text
        x={1}
        y={1}
        stroke="none"
        style={{font: '1px monospace'}}
      >
        experiment: where did I touch you?
      </text>

      {hit ? (
        <>
          <circle
            cx={hit[0]}
            cy={hit[1]}
            r={1.5}
            fill="rgb(0 0 255 / 1)"
            stroke="none"
            style={{
              transform: `translate(-50, -50%)`
            }}
          />
          <text
            x={hit[0] + 2}
            y={hit[1] + 0.5}
            stroke="none"
            style={{font: '1px monospace'}}
          >
            here
          </text>
        </>
      ): null}

    </Graph>
    </div>
  );
};

