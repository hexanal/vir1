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
import useCursor from '../hooks/useCursor';
import useCollision from '../hooks/useCollision';

import ControlPanel from '../components/controls/ControlPanel';
import Graph from '../components/viz/Graph';
import GraphAxes from '../components/viz/GraphAxes';

const ADDING_BINDINGS = [false, true];

function lerp(v0, v1, t) {
  return (1 - t) * v0 + t * v1;
}

function sherp(x, a, b) {
  return x * (b - a) + a;
}

function smoothstep(x, a, b) {
  x = x * x * (3.0 - 2.0 * x);
  return x * (b - a) + a;
}

export default function Cursoor(props) {
  const {
    style = null,
    graphStyle = null,
  } = props || {};
  const { t, elapsed } = useRaf();
  const { position, ratio } = useCursor({
    // offset: { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    // ratioOffset: { x: -0.5, y: -0.5 }
  });
  const {x, y} = ratio || [];

  useEffect( () => {
  }, [x, y]);

  return (
    <div
      style={{
        ...style,
      }}
    >
      <Graph
        style={{
          ...graphStyle,
        }}
        withoutLines
      >
        <GraphAxes
          subdivisions={4}
          dashes={4}
          xOffset={50}
          yOffset={50}
        />

        {ratio ? (
          <circle
            cx={x * 50 + 50}
            cy={y * 50 + 50}
            r={3}
            fill={'rgb(255 255 0 / 1)'}
            stroke={'none'}
          />
        ): null}

      </Graph>
    </div>
  );
};

