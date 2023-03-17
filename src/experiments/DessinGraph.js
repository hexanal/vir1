import { v4 as uuidv4 } from 'uuid';
import  {
  Fragment,
  useCallback,
  useState,
  useEffect,
  useRef
} from 'react';

import useRaf from '../hooks/useRaf';
import useFaderControl from '../hooks/useFaderControl';
import useToggleControl from '../hooks/useToggleControl';
import usePointer from '../hooks/usePointer';
import useCollision from '../hooks/useCollision';

import ControlPanel from '../components/controls/ControlPanel';
import Graph from '../components/viz/Graph';
import GraphAxes from '../components/viz/GraphAxes';

export default function DessinGraph(props) {
  const {
    style = null,
    graphStyle = null,
  } = props || {};
  // NOTE: example for usePointer + useCollision 
  const { t, elapsed } = useRaf();
  const { pointers } = usePointer();
  const { position, buttons } = pointers[0] || {};
  const [x, y] = position || [];

  const ref = useRef(null);
  const { hit } = useCollision({
    ref,
    coords: [x, y]
  });
  const [hitX = 0 , hitY = 0] = hit || [];

  return (
    <div
      style={{
        ...style,
      }}
    >
      <Graph
        ref={ref}
        style={{
          ...graphStyle,
        }}
        withoutLines
      >
        <GraphAxes
          subdivisions={4}
          dashes={4}
        />

        <text
          x={4}
          y={4}
          style={{
            fontSize: '3px'
          }}
          fill={`rgb(0 0 0 / 1)`}
          stroke={`none`}
        >
          {x}
        </text>
        <text
          x={4}
          y={8}
          style={{
            fontSize: '3px'
          }}
          fill={`rgb(0 0 0 / 1)`}
          stroke={`none`}
        >
          {y}
        </text>

        <text
          x={4}
          y={80}
          style={{
            fontSize: '3px'
          }}
          fill={`rgb(0 0 0 / 1)`}
          stroke={`none`}
        >
          {hitX}
        </text>
        <text
          x={4}
          y={84}
          style={{
            fontSize: '3px'
          }}
          fill={`rgb(0 0 0 / 1)`}
          stroke={`none`}
        >
          {hitY}
        </text>

        {hit ? (
          <circle
            cx={hitX}
            cy={hitY}
            r={3}
            fill={'rgb(255 255 0 / 1)'}
            stroke={'none'}
          />
        ): null}

      </Graph>
    </div>
  );
};

