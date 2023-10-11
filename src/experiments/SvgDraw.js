import { v4 as uuidv4 } from 'uuid';
import  {
  Fragment,
  useCallback,
  useState,
  useMemo,
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

const renderPointString = ({ type = null, params = {} }) => {
    const {
      x = 0,
      y = 0,
      x1 = 0,
      y1 = 0,
      x2 = 0,
      y2 = 0,
      rx = 0,
      ry = 0,
      xAxisRotation = 0,
      largeArcFlag = 0,
      sweepFlag = 0,
    } = params;

    switch (type) {
      case 'M':
        return `M ${x},${y}`;
      case 'L':
        return `L ${x},${y}`;
      case 'H':
        return `H ${x}`;
      case 'V':
        return `V ${y}`;
      case 'C':
        return `C ${x1},${y1} ${x2},${y2} ${x},${y}`;
      case 'Q':
        return `Q ${x1},${y1} ${x},${y}`;
      case 'A':
        return `A ${rx},${ry} ${xAxisRotation},${largeArcFlag},${sweepFlag} ${x},${y}`;
      case 'Z':
        return 'Z';
      default:
        return ''; // Handle unsupported type
    };
  };

function Path(props) {
  const { points = [] } = props || {};

  const d = useMemo( () => {
    const pathString = points.map(p => {
      return renderPointString(p);
    }).join(' ');

    // console.log(pathString);
    return pathString;
  }, [props]);

  return (
    <path
      d={d}
      stroke={`rgb(0 0 0 / 1)`}
      strokeWidth={1}
      fill={`rgb(255 255 0 / 0.1)`}
    />
  );
}

/*
 *
faders for L
  x (float)
  y (float)

faders for C
  x (float)
  y (float)
  x1 (float)
  y1 (float)
  x2 (float)
  y2 (float)

faders for Q
  x (float)
  y (float)
  x1 (float)
  y1 (float)

faders for A
  x (float)
  y (float)
  rx (float)
  ry (float)
  xAxisRotation (deg?)
  sweepFlag (bool?)
  largeArcFlag (bool?)

*/

export default function SvgDraw(props) {
  const { t, elapsed } = useRaf();

  const ref = useRef(null);
  const { pointers } = usePointer();
  const { position, buttons } = pointers[0] || {};
  const [x, y] = position || [];
  const { hit, size, isInside } = useCollision({
    ref,
    coords: [x, y]
  });
  const [hitX = 0 , hitY = 0] = hit || [];

  console.log(hit);

  const [snapValue, SnapValueFader] = useFaderControl({
    label: 'Snap',
    value: 4,
    min: 2,
    max: 16,
  });
  const onContextMenu = useCallback(e => {
    e.preventDefault();
  }, []);

  const pathPoints = useRef([]);

  const snappedPosition = useRef([0, 0]);
  useEffect(() => {
    // NOTE might not be necessary to get size
    // const [w, h] = size;
    // console.log({hitX, w});

    const snip = 100 / (snapValue * 2);
    snappedPosition.current = [
      Math.round(hitX / snip) * snip,
      Math.round(hitY / snip) * snip
    ];

  }, [hitX, hitY, snapValue, size]);

  const [snappedX, snappedY] = snappedPosition.current;

  useEffect(() => {
    const type = pathPoints.current.length === 0
      ? 'M'
      : 'L';

    if (buttons === 1) {
      pathPoints.current.push({
        type,
        params: {
          x: snappedX,
          y: snappedY,
        }
      });
    }

    // console.log(pathPoints.current);
  }, [buttons]);


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
      // onContextMenu={onContextMenu}
    >
      <ControlPanel style={{
        position: 'absolute',
        zIndex: 2,
        top: '1rem',
        right: '1rem',
      }}>
        <SnapValueFader />
        <pre>
          x: {snappedX}
          y: {snappedY}
        </pre>
      </ControlPanel>

      <Graph
        ref={ref}
        style={{
          width: 'auto',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        withoutLines
      >
        <GraphAxes
          subdivisions={snapValue}
          dashes={4}
        />

        <Path points={pathPoints.current} />

        {hit ? (
          <circle
            cx={snappedX}
            cy={snappedY}
            r={3}
            fill={'rgb(255 255 0 / 1)'}
            stroke={'none'}
          />
        ): null}
      </Graph>
    </div>
  );
};

