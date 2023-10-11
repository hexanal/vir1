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

function getLetterPath(letter) {
  switch(letter) {
    case 'A':
      return `
          M 0,0
          L 100,50
      `
    default:
      return '';
  }
}

export default function SvgFont2(props) {

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
      <Graph
        style={{
          width: 'auto',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        withoutLines
      >
        <GraphAxes
          subdivisions={8}
          dashes={4}
        />

        <path
          d={getLetterPath('A')}
          stroke={`rgb(0 0 0 / 1)`}
          fill={`rgb(255 255 0 / 0.1)`}
          vectorEffect="non-scaling-stroke"
        />
      </Graph>
    </div>
  );
};

