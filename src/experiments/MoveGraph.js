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

export default function MoveGraph(props) {
  const {
    style = null,
    graphStyle = null,
  } = props || {};
  const { t, elapsed } = useRaf();
  const { pointers } = usePointer();
  const { position, buttons, displace, distance } = pointers[0] || {};
  const [x, y] = position || [];

  const [ZETA, ZetaFader] = useFaderControl({
    label: '𝜁',
    value: 0.5,
    min: 0.0,
    max: 1,
    step: 0.01,
  });

  const points = useRef([]);

  const ref = useRef(null);
  const { hit, isInside } = useCollision({
    ref,
    cursor: [x, y]
  });
  const [hitX = 0 , hitY = 0] = hit || [];

  const pan = useRef([0, 0]);
  const [panX = 0 , panY = 0] = pan.current || [];

  useEffect( () => {
    if (buttons === 1 && isInside) {
      pan.current = [
        pan.current[0] + displace[0] * 0.01,
        pan.current[1] + displace[1] * 0.01,
      ];
      // console.table(displace[0], displace[1]);
      // console.table(displace[0], displace[1]);
    }
    // points.current[latestIndex.current] = [lx, ly, 0, elapsed];
  }, [displace, isInside, buttons]);

  return (
    <div
      style={{
        ...style,
      }}
    >
      <ControlPanel
        style={{
          position: 'absolute',
          zIndex: 2,
          top: '1rem',
          right: '1rem',
        }}
      >
        <ZetaFader />
      </ControlPanel>

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
          xOffset={panY}
          yOffset={panX}
        />

        <text
          x={51}
          y={48}
          style={{
            fontSize: '3px'
          }}
          fill={`rgb(0 0 0 / 1)`}
          stroke={`none`}
        >
          {ZETA}
        </text>

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
          x={51}
          y={8}
          style={{
            fontSize: '3px'
          }}
          fill={`rgb(0 0 0 / 1)`}
          stroke={`none`}
        >
          {ZETA}
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

